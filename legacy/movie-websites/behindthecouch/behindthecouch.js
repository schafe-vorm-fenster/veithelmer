		activeTooltipId = '';
		
		function showToolTip(id) {
			oItem = document.getElementById(id);
			activeTooltipId = id;
			className = 'tooltip-' + id;
			oItem.className = className;
		}

		function hideToolTip() {
			oItem = document.getElementById(activeTooltipId);
			activeTooltipId = '';
			oItem.className = 'tooltip-off';
		}


		activeDirector = '';
		
		function showDirector(id) {
			oItem = document.getElementById(id);
			activeDirector = id;
			className = 'director-' + id;
			oItem.className = className;
		}

		function hideDirector() {
			oItem = document.getElementById(activeDirector);
			oItem.className = 'director-off';
			activeDirector = '';
		}