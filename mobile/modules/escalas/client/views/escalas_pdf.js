Controller('escalasPDFView',{
	created:function(){
		PDFJS.workerSrc = '/packages/pascoual_pdfjs/build/pdf.worker.js';
		currentPageVar = new ReactiveVar(1);
		maxPagesVar = new ReactiveVar(1);
		currentZoomVar = new ReactiveVar(10);
	},
	helpers:{
		escala:function(){
			return Escala.findOne(FlowRouter.getParam('id'));
		},
		escalaFile:function(){
			return ;
		},
		prevPageDisabled:function(){
			return currentPageVar.get() <= 1;
		},
		nextPageDisabled:function(){
			return currentPageVar.get() >= maxPagesVar.get();
		},
		currentPage:function(){
			return currentPageVar.get();
		}
	},
	rendered:function(){
		$('#zoomRange').range({
        min: 10,
        max: 30,
        start: 10,
				onChange: function(val) { currentZoomVar.set(val/10); }
    });
		// Create PDF
		var url = '/escalas/view/'+FlowRouter.getParam('id');
		Tracker.autorun(function(){
			page = currentPageVar.get();
			zoom = currentZoomVar.get();
			PDFJS.getDocument(url).then(function getPDFEscalas(pdf) {
				maxPagesVar.set(pdf.pdfInfo.numPages);
				// Fetch the first page
				pdf.getPage(page).then(function getPDFEscalas(page) {
					var scale = currentZoomVar.get();
					console.log(scale);
					var viewport = page.getViewport(scale);

					// Prepare canvas using PDF page dimensions
					var canvas = document.getElementById('pdfcanvas');
					var context = canvas.getContext('2d');

					canvas.height = viewport.height;
					canvas.width = viewport.width;

					console.log(canvas.width);
					// Render PDF page into canvas context
					page.render({canvasContext: context, viewport: viewport}).promise.then(function () {

					});
				});
			});
		});
	},
	events:{
		'click #zoomToggle':function(e,t){
			var zoom = zoomed.get();
			zoomed.set(!zoom);
		},
		'click #escalasNextPage':function(e,t){
			var page = currentPageVar.get();
			if (page == maxPagesVar.get()) return false;
			page++;
			currentPageVar.set(page);
		},
		'click #escalasPrevPage':function(e,t){
			var page = currentPageVar.get();
			if (page == 1) return false;
			page--
			currentPageVar.set(page);
		}
	}
});
