Controller('datePickerSidebar', {
	created: function() {
		datePickerFieldVar = new ReactiveVar();
	},
	rendered: function() {
		$('.ui.bottom.sidebar#datePickerSidebar').sidebar({
			onVisible: function() {
				var value = moment($(datePickerFieldVar.get()).val(), 'DD/MM/YYYY');
				$('#datePickerSidebarDay').val(value.format('DD'));
				$('#datePickerSidebarMonth').val(value.format('MM'));
				$('#datePickerSidebarYear').val(value.format('YYYY'));
			}
		});
	},
	events: {
		'click #setDateEvent': function() {
			var day = $('#datePickerSidebarDay').val();
			var month = $('#datePickerSidebarMonth').val();
			var year = $('#datePickerSidebarYear').val();
			var date = moment(year + '-' + month + '-' + day, 'YYYY-MM-DD');
			$(datePickerFieldVar.get()).val(date.format('DD/MM/YYYY'));
			$('.ui.bottom.sidebar#datePickerSidebar').sidebar('hide');
		},
		'click #todayDateEvent': function() {
			$(datePickerFieldVar.get()).val(moment().format('DD/MM/YYYY'));
			$('.ui.bottom.sidebar#datePickerSidebar').sidebar('hide');
		}
	}
});
