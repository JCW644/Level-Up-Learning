chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({exp: 0}, () => console.log(`Initial experience set to 0`));
  chrome.storage.sync.set({lvl: 0}, () => console.log(`Initial level set to 0`));
  chrome.storage.sync.set({exp_points: 0});
  chrome.storage.sync.set({startTime: null});
  chrome.storage.sync.set({exp_max: 3000});
  chrome.storage.sync.set({counting: false});
  chrome.storage.sync.set({valid_urls: ["www.google.com", "www.khanacademy.com", "www.desmos.com", "www.wolframalpha.com"]});
  chrome.storage.sync.set({validURL: false});
});

chrome.runtime.onStartup.addListener(() => {

	chrome.storage.sync.set({startTime: null});
	chrome.storage.sync.set({counting: false});
	check_url();

});

chrome.tabs.onActivated.addListener(() => {

  update_lvl();
	check_url();
	setTimeout(function() {toggleTimer();}, 1000);

});

function toggleTimer() {

	chrome.storage.sync.get('counting', (obj) => {
		chrome.storage.sync.get('validURL', (obj2) => {
			if (!obj.counting && obj2.validURL) {

				console.log('Background.js: Site is valid, starting timer.');
				chrome.storage.sync.set({startTime: (Math.floor(Date.now()/1000))});
				chrome.storage.sync.set({counting: true});
			}
			else if (obj.counting && !obj2.validURL) {

				console.log('Background.js: Site is invalid, pausing timer.');
				chrome.storage.sync.get('startTime', (obj) => {

					if (obj.startTime != null) {
						chrome.storage.sync.get('exp_points', (obj2) => {

							chrome.storage.sync.set({exp_points:  obj2.exp_points + (Math.floor(Date.now()/1000) - obj.startTime)});

						});

						chrome.storage.sync.set({startTime: null});
					}

				});

				chrome.storage.sync.set({counting: false});

			}

		});

	});

}

// check_url() also found in progress.js
function check_url() {
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
		let url = tabs[0].url;

		chrome.storage.sync.get('valid_urls', (obj) => {

			for(let i = 0; i < obj.valid_urls.length; i++) {

				if (url.indexOf(obj.valid_urls[i]) != -1) {
					chrome.storage.sync.set({validURL: true});
					console.log('validURL set to true');
				} else {
					chrome.storage.sync.set({validURL: false});
					console.log('validURL set to false');
				}

			}

		});

	});
}

//update_lvl function exists also in progress.js and popup.js
function update_lvl() {

	chrome.storage.sync.get('exp_max', (obj) => {

		chrome.storage.sync.get('exp_points', (obj2) => {

			if (obj2.exp_points >= obj.exp_max) {

				chrome.storage.sync.set({exp_max: Math.floor((1.2)*(obj.exp_max))}); //Doesn't currently factor in current lvl for exp_max change
				chrome.storage.sync.set({exp_points: 0});
				chrome.storage.sync.get('lvl', (obj2) => {

					chrome.storage.sync.set({lvl: obj2.lvl + 1});

				})
			}

		});

	});

}
