var app = new Vue({
	el: '#app',
	data: {
		apps: [], // список все приложений получается с getAllApps метода
		popupStatus: false,
		appSelected: null
	},
	methods: {
		getAllApps: function () {
			fetch('YOUR_URL')
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					this.apps = data;
				});
		},
		statusApp: function () {
			for (let i = 0; i < this.apps.length; i++) {
				this.apps[i].myid = i;
				switch (this.apps[i].bot) {
					case '0':
						this.apps[i].text = 'Unwatch';
						this.apps[i].class = 'status_false';
						break;
					case '1':
						this.apps[i].text = 'Tune';
						this.apps[i].class = 'status_yellow';
						break;
					case '2':
						this.apps[i].text = 'Live';
						break;
					case '3':
						this.apps[i].text = 'FB Ban';
						this.apps[i].class = 'status_false';
						break;
					case '4':
						this.apps[i].text = 'Banned';
						this.apps[i].class = 'status_false';
						break;
					case '5':
						this.apps[i].text = 'Review';
						this.apps[i].class = 'status_yellow';
						break;
				}
			}
		},
		popupMenu: function (id) {
			document.querySelector('.app__list').classList.add('app__active');
			this.appSelected = this.apps[id];
			this.popupStatus = true;
		},
		popupClose: function () {
			document.querySelector('.app__list').classList.remove('app__active');
			this.appSelected = null;
			this.popupStatus = false;
		},
		sendApp: function () {
			(async () => {
				const rawResponse = await fetch('YOUR_URL', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(this.appSelected)
				});
				const content = await rawResponse.json();
				console.log(content);
			})();
			document.querySelector('.app__list').classList.remove('app__active');
			this.apps[this.appSelected.myid] = this.appSelected;
			this.appSelected = null;
			this.popupStatus = false;
		}
	}
})