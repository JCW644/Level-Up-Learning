let progress = document.getElementById('progress');
let exp_display = document.getElementById('exp');
let currentlvl = document.getElementById('currentlvl');
let nextlvl = document.getElementById('nextlvl');
let button1 = document.getElementById('achievements');
let button2 = document.getElementById('leaderboard');
let button3 = document.getElementById('settings');

/////////////////////Debugging//////////////////////////

button1.addEventListener("click", () => {

	chrome.storage.sync.get('startTime', function(obj) {

		alert(obj.startTime);

	});

});

button2.addEventListener("click", () => {

	chrome.storage.sync.get('exp_points', function(obj) {

		alert(obj.exp_points);

	});

});

button3.addEventListener("click", () => {

	chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    alert(allKeys);
	});

});
////////////////////////////////////////////////////////

chrome.storage.sync.get('exp_points', (obj) => {
	chrome.storage.sync.get('exp_max', (obj2) => {

		let fill = obj.exp_points / obj2.exp_max;

		if (fill >= 1) {

			exp_display.innerHTML = "EXP: " + obj2.exp_max;

			progress.style.width = 100 + "%";

		} else {

			exp_display.innerHTML = "EXP: " + obj.exp_points;

			progress.style.width = fill * 100 + "%";

		}

	});

});

// update_lvl function exists also in background.js and progress.js. popup.js update_lvl() calls restartTimer()
// to also document and show progress while also continuing to count seconds on the valid page.
function update_lvl() {

	chrome.storage.sync.get('exp_max', (obj) => {

		chrome.storage.sync.get('exp_points', (obj2) => {

			if (obj2.exp_points >= obj.exp_max) {

				chrome.storage.sync.set({exp_max: Math.floor((1.2)*(obj.exp_max))}, () => alert("Level up!")); //Doesn't currently factor in current lvl for exp_max change
				chrome.storage.sync.set({exp_points: 0}, () => alert('exp reset'));
				chrome.storage.sync.get('lvl', (obj2) => {

					chrome.storage.sync.set({lvl: obj2.lvl + 1});

				})
			}

		});

	});

	restartTimer();

}

function update_display() {
	chrome.storage.sync.get('lvl', (obj) => {
		currentlvl.innerHTML = obj.lvl;
		nextlvl.innerHTML = obj.lvl + 1;
	});
}

function restartTimer() {

	chrome.storage.sync.get('counting', (obj) => {
			if (obj.counting) {
				chrome.storage.sync.get('startTime', (obj) => {

					if (obj.startTime != null) {
						chrome.storage.sync.get('exp_points', (obj2) => {

							chrome.storage.sync.set({exp_points:  obj2.exp_points + (Math.floor(Date.now()/1000) - obj.startTime)});

						});

						chrome.storage.sync.set({startTime: (Math.floor(Date.now()/1000))});
					}

				});

			}

	});

}

window.addEventListener('DOMContentLoaded', function() {
  update_lvl();
	update_display();
});
