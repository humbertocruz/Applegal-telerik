Controller('homeView',{
	created(){
		$.fn.form.settings.rules.validCPF = function(value) {
		  return TestaCPF(value);
		};
	},
	rendered(){
		$('.ui.radio.checkbox').checkbox();
	},
	events:{
	},
	helpers:{
		header:function(){
			return {
				title:'Home',
				icon:'home'
			}
		},
		newLink:function(){
			return false;
		},
		extraLinks:function(){
			return false;
		}
	}
});
