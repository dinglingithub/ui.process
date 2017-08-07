
(function(){
	$.fn.exist = function(){ 
        if($(this).length>=1){
            return true;
        }
        return false;
    };
	
	$.fn.jtask = function(options){
		var defaults = {
			'type':'Task',
			'label':''
		};
		var opts = $.extend(defaults,options);
		this.config = opts;
		this.container = this.config.container;
		this.id = this.config.id;
		this.jsPlumb = this.config.jsPlumb;
		this.sourceEndpoint = this.config.sourceEndpoint;
		this.targetEndpoint = this.config.targetEndpoint;
		this.label = this.config.label;
		this.endpoints = [];
		
		this.type = this.config.type;
		this.addEndpoints = function (toId, sourceAnchors, targetAnchors) {
			for (var i = 0; i < sourceAnchors.length; i++) {
	            var sourceUUID = toId + sourceAnchors[i];
	            var ep = this.jsPlumb.addEndpoint( toId, this.sourceEndpoint, {
	                anchor: sourceAnchors[i], uuid: sourceUUID
	            });
	            this.endpoints.push(ep);
	        }
	        for (var j = 0; j < targetAnchors.length; j++) {
	            var targetUUID = toId + targetAnchors[j];
	            var ep = this.jsPlumb.addEndpoint( toId, this.targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
	            this.endpoints.push(ep);
	        }
		}
		
		if ($('#'+this.id).exist()){
			alert('The '+this.type+ '\'s id is existing!');
			return;
		}
		
		if (this.type == 'Task'){
			this.div = $('<div class="window jtk-node" id="'+this.id+'"><div id="windowclose_'+this.id+'" class="windowclose">x</div><strong>'+this.label+'</strong><br/></div>');
		}
		if (this.type == 'Decion'){
			this.div = $('<div class="shape" data-shape="Decion" id="'+this.id+'"><canvas class="canvas" width="50" height="50"></canvas><div id="windowclose_'+this.id+'" class="decionclose">x</div><span>'+this.label+'</span><br/></div>');
			var g = this.div.children().get(0).getContext('2d');
			g.strokeStyle = '#346789';
			g.fillStyle = '#eeeeef';
			g.lineWidth = 2;
			//g.shadowBlur=5;
			//g.shadowColor="#aaa";
			g.beginPath();
			g.moveTo(25,0);
			g.lineTo(50,25);
			g.lineTo(25,50);
			g.lineTo(0,25);
			g.lineTo(25,0);
			g.stroke();
			g.fill();
			
		}
		if (this.type == 'Start'){
			this.div = $('<div class="shape" data-shape="Start" id="'+this.id+'"><canvas class="canvas" width="36" height="36"></canvas><div id="windowclose_'+this.id+'" class="decionclose">x</div><span>'+this.label+'</span><br/></div>');
			var g = this.div.children().get(0).getContext('2d');
			g.strokeStyle = '#346789';
			g.fillStyle = '#346789';
			g.lineWidth = 1;
			//g.shadowBlur=5;
			//g.shadowColor="#aaa";
			g.arc(18,18,16,0, 2*Math.PI, true);
			g.stroke();
			
			g.beginPath();
			g.arc(18,18,13,0, 2*Math.PI, true);
			g.stroke();
			g.fill();
		}
		if (this.type == 'Final'){
			this.div = $('<div class="shape" data-shape="Final" id="'+this.id+'"><canvas class="canvas" width="36" height="36"></canvas><div id="windowclose_'+this.id+'" class="decionclose">x</div><span>'+this.label+'</span><br/></div>');
			var g = this.div.children().get(0).getContext('2d');
			g.strokeStyle = '#346789';
			g.fillStyle = '#346789';
			g.lineWidth = 2;
			//g.shadowBlur=5;
			//g.shadowColor="#aaa";
			g.arc(18,18,16,0, 2*Math.PI, true);
			g.stroke();
			
			g.beginPath();
			g.arc(18,18,8,0, 2*Math.PI, true);
			g.stroke();
			g.fill();
		}
			
		this.div.appendTo(this.container);
		this.jsPlumb.draggable(jsPlumb.getSelector("#"+this.id), { grid: [20, 20] });
		this.div.bind('mouseover',function(e){
			$('#windowclose_'+this.id).show();
		});
		this.div.bind('mouseout',function(e){
			$('#windowclose_'+this.id).hide();
		});
		
		$('#windowclose_'+this.id).bind('click',{'task':this} , function(e){
			e.data.task.div.remove();
			for (var i = 0 ; i < e.data.task.endpoints.length ; i ++ ){
				window.jsp.deleteEndpoint(e.data.task.endpoints[i]);
			}
			this.endpoints = [];
		});
		
		if (this.type == 'Start'){
			this.addEndpoints(this.id , ["BottomCenter"], [])
		}else if (this.type == 'Final'){
			this.addEndpoints(this.id , [], ["TopCenter"])
		}else{
			this.addEndpoints(this.id , ["RightMiddle", "LeftMiddle","BottomCenter"], ["TopCenter"])
		}
		
	}
})(jQuery);