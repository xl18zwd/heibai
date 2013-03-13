(function() {

	$(document).ready(function(){
		
		var chess = new Array(64);
		var white = -1;
		var black = 1;
		var empty = 0;
		var validBlack = 2;
		var validWhite = -2;
		var map = ['A1','B1','C1','D1','E1','F1','G1','H1','A2','B2','C2','D2','E2','F2','G2','H2','A3','B3','C3','D3','E3','F3','G3','H3',
		'A4','B4','C4','D4','E4','F4','G4','H4','A5','B5','C5','D5','E5','F5','G5','H5','A6','B6','C6','D6','E6','F6','G6','H6',
		'A7','B7','C7','D7','E7','F7','G7','H7','A8','B8','C8','D8','E8','F8','G8','H8'];
		var indexMap = {'A1':0,'B1':1,'C1':2,'D1':3,'E1':4,'F1':5,'G1':6,'H1':7,'A2':8,'B2':9,'C2':10,'D2':11,'E2':12,'F2':13,'G2':14,'H2':15,
		'A3':16,'B3':17,'C3':18,'D3':19,'E3':20,'F3':21,'G3':22,'H3':23,'A4':24,'B4':25,'C4':26,'D4':27,'E4':28,'F4':29,'G4':30,'H4':31,
		'A5':32,'B5':33,'C5':34,'D5':35,'E5':36,'F5':37,'G5':38,'H5':39,'A6':40,'B6':41,'C6':42,'D6':43,'E6':44,'F6':45,'G6':46,'H6':47,
		'A7':48,'B7':49,'C7':50,'D7':51,'E7':52,'F7':53,'G7':54,'H7':55,'A8':56,'B8':57,'C8':58,'D8':59,'E8':60,'F8':61,'G8':62,'H8':63}
		
		init();
		markValid(black);
		//eatChessman(2,3,white);
		//markValid(white);
		
		$("img").click(function(){
			var id = $(this).parent().attr("id").toString();
			//alert(chess[index(getX(indexMap[id]),getY(indexMap[id]))])
			switch(chess[index(getX(indexMap[id]),getY(indexMap[id]))])
				{
				case validBlack:
 				 eatChessman(getX(indexMap[id]),getY(indexMap[id]),white);
 				 markValid(white);
				  break;
				case validWhite:
  				 eatChessman(getX(indexMap[id]),getY(indexMap[id]),black);
  				 markValid(black);
				  break;
				default:
 				 //$("#"+map[i]+" img").attr("src","images/resources/Can.bmp");
			}
		})
		
		function init(){
			for(i=0;i<64;i++){
				chess[i]=empty;
			}
			chess[index(3,3)]=white;
			chess[index(4,4)]=white;
			chess[index(3,4)]=black;
			chess[index(4,3)]=black;
			chess[index(3,2)]=validBlack;
			chess[index(2,3)]=validBlack;
			chess[index(5,4)]=validBlack;
			chess[index(4,5)]=validBlack;
			
			refresh(chess);
		}
		
		function refresh (arrayobj) {
		  for(i=0;i<64;i++){
				switch(arrayobj[i])
				{
				case black:
 				 $("#"+map[i]+" img").attr("src","images/resources/Black.bmp");
				  break;
				case white:
  				 $("#"+map[i]+" img").attr("src","images/resources/White.bmp");
				  break;
				case empty:
  				 $("#"+map[i]+" img").attr("src","images/resources/Empty.bmp");
				  break;
				default:
 				 $("#"+map[i]+" img").attr("src","images/resources/Can.bmp");
				}
			}
			var validNum = 0;
			var emptyNum = 0;
			var blackNum = 0;
			var whiteNum = 0;
			for (var i=0; i < 64; i++) {
			  switch(arrayobj[i]){
				case black:
 				 blackNum++;
				  break;
				case white:
  				 whiteNum++;
				  break;
				case empty:
  				 emptyNum++;
				  break;
				default:
 				 validNum++;
			  }
			};
			if (emptyNum==0||validNum==0) {
				if(blackNum > whiteNum){var r=confirm("黑棋"+blackNum+"子，白棋"+whiteNum+"子，黑棋胜白棋"+(blackNum-whiteNum)+"子，重新开始吗？");}
				else{var r=confirm("黑棋"+blackNum+"子，白棋"+whiteNum+"子，白棋胜黑棋"+(whiteNum-blackNum)+"子，重新开始吗？");}
				
				if (r==true){
  					init();
  				}
				else{
  					init();
  				}
			};
		}
		
		function index (x,y) {
		  return y*8+x;
		}
		
		function getX (index) {
		  return index%8;
		}
		
		function getY (index) {
		  return Math.floor(index/8);
		}
		
		/**判断某点落子是否可以在右侧吃子 
 		 * @param {Object} x      横坐标
 		 * @param {Object} y      纵坐标
 		 * @param {Object} color  棋子颜色
		 */
		function righyValid (x,y,color) {
			var i = 2;
            if (x >= 6 || chess[index(x+1,y)] == color || chess[index(x+1,y)] == empty || chess[index(x+1,y)] == validBlack || chess[index(x+1,y)] == validWhite) return false;      //x坐标大于5或右边第一格为空或为同色时，不能在右面吃子
            else if (chess[index(x+2,y)] == color) return true;                                 //右边第一格为异色，第二格为同色，可以吃一子
            else                                                               
                while (chess[index(x+i,y)] != color)                                        //当右边第i格不为同色时，进入循环
                {
                    if ((x + i + 1) <= 7) { i += 1; continue; }         //若右边第i格为异色且存在第i+1格，进入下一个循环
                    else return false;                                             //右边第i格为异色且不存在第i+1格，不能在右面吃子
                }
            return true;  
		}
		
		/**判断某点落子是否可以在左侧吃子 
 		 * @param {Object} x      横坐标
 		 * @param {Object} y      纵坐标
 		 * @param {Object} color  棋子颜色
		 */
		function leftValid (x,y,color) {
			var i = 2;
            if (x <= 1 || chess[index(x-1,y)] == color || chess[index(x-1,y)] == empty || chess[index(x-1,y)] == validBlack || chess[index(x-1,y)] == validWhite) return false;      //x坐标大于5或左边第一格为空或为同色时，不能在左面吃子
            else if (chess[index(x-2,y)] == color) return true;                                 //左边第一格为异色，第二格为同色，可以吃一子
            else                                                               
                while (chess[index(x-i,y)] != color)                                        //当左边第i格不为同色时，进入循环
                {
                    if ((x - i - 1) >= 0) { i += 1; continue; }         //若左边第i格为异色且存在第i+1格，进入下一个循环
                    else return false;                                             //左边第i格为异色且不存在第i+1格，不能在左面吃子
                }
            return true;  
		}
		
		/**判断某点落子是否可以在下侧吃子 
 		 * @param {Object} x      横坐标
 		 * @param {Object} y      纵坐标
 		 * @param {Object} color  棋子颜色
		 */
		function downValid (x,y,color) {
			var i = 2;
            if (y >= 6 || chess[index(x,y+1)] == color || chess[index(x,y+1)] == empty || chess[index(x,y+1)] == validBlack || chess[index(x,y+1)] == validWhite) return false;      //x坐标大于5或右边第一格为空或为同色时，不能在下面吃子
            else if (chess[index(x,y+2)] == color) return true;                                 //下边第一格为异色，第二格为同色，可以吃一子
            else                                                               
                while (chess[index(x,y+i)] != color)                                        //当下边第i格不为同色时，进入循环
                {
                    if ((y + i + 1) <= 7) { i += 1; continue; }         //若下边第i格为异色且存在第i+1格，进入下一个循环
                    else return false;                                             //下边第i格为异色且不存在第i+1格，不能在下面吃子
                }
            return true;  
		}
		
		/**判断某点落子是否可以在上侧吃子 
 		 * @param {Object} x      横坐标
 		 * @param {Object} y      纵坐标
 		 * @param {Object} color  棋子颜色
		 */
		function upValid (x,y,color) {
			var i = 2;
            if (y <= 1 || chess[index(x,y-1)] == color || chess[index(x,y-1)] == empty || chess[index(x,y-1)] == validBlack || chess[index(x,y-1)] == validWhite) return false;      //x坐标大于5或上边第一格为空或为同色时，不能在上面吃子
            else if (chess[index(x,y-2)] == color) return true;                                 //上边第一格为异色，第二格为同色，可以吃一子
            else                                                               
                while (chess[index(x,y-i)] != color)                                        //当上边第i格不为同色时，进入循环
                {
                    if ((y - i - 1) >= 0) { i += 1; continue; }         //若上边第i格为异色且存在第i+1格，进入下一个循环
                    else return false;                                             //上边第i格为异色且不存在第i+1格，不能在上面吃子
                }
            return true;  
		}
		
		/**判断某点落子是否可以在左上侧吃子 
 		 * @param {Object} x      横坐标
 		 * @param {Object} y      纵坐标
 		 * @param {Object} color  棋子颜色
		 */
		function leftupValid (x,y,color) {
			var i = 2;
            if (x <= 1 || y <= 1 || chess[index(x-1,y-1)] == color || chess[index(x-1,y-1)] == empty || chess[index(x-1,y-1)] == validBlack || chess[index(x-1,y-1)] == validWhite) return false;      //x坐标大于5或左上边第一格为空或为同色时，不能在左上面吃子
            else if (chess[index(x-2,y-2)] == color) return true;                                 //左上边第一格为异色，第二格为同色，可以吃一子
            else                                                               
                while (chess[index(x-i,y-i)] != color)                                        //当左上边第i格不为同色时，进入循环
                {
                    if ((x - i - 1) >= 0 && (y - i - 1) >= 0)  { i += 1; continue; }         //若左上边第i格为异色且存在第i+1格，进入下一个循环
                    else return false;                                             //左上边第i格为异色且不存在第i+1格，不能在左上面吃子
                }
            return true;  
		}
		
		/**判断某点落子是否可以在右下侧吃子 
 		 * @param {Object} x      横坐标
 		 * @param {Object} y      纵坐标
 		 * @param {Object} color  棋子颜色
		 */
		function rightdownValid (x,y,color) {
			var i = 2;
            if (x >= 6 || y >= 6 || chess[index(x+1,y+1)] == color || chess[index(x+1,y+1)] == empty || chess[index(x+1,y+1)] == validBlack || chess[index(x+1,y+1)] == validWhite) return false;      //x坐标大于5或右下边第一格为空或为同色时，不能在右下面吃子
            else if (chess[index(x+2,y+2)] == color) return true;                                 //右下边第一格为异色，第二格为同色，可以吃一子
            else                                                               
                while (chess[index(x+i,y+i)] != color)                                        //当右下边第i格不为同色时，进入循环
                {
                    if ((x + i + 1) <= 7 && (y + i + 1) <= 7) { i += 1; continue; }         //若右下边第i格为异色且存在第i+1格，进入下一个循环
                    else return false;                                             //右下边第i格为异色且不存在第i+1格，不能在右下面吃子
                }
            return true;  
		}
		
		/**判断某点落子是否可以在左下侧吃子 
 		 * @param {Object} x      横坐标
 		 * @param {Object} y      纵坐标
 		 * @param {Object} color  棋子颜色
		 */
		function leftdownValid (x,y,color) {
			var i = 2;
            if (x <= 1 || y >= 6 || chess[index(x-1,y+1)] == color || chess[index(x-1,y+1)] == empty || chess[index(x-1,y+1)] == validBlack || chess[index(x-1,y+1)] == validWhite) return false;      //x坐标大于5或左下边第一格为空或为同色时，不能在左下面吃子
            else if (chess[index(x-2,y+2)] == color) return true;                                 //左下边第一格为异色，第二格为同色，可以吃一子
            else                                                               
                while (chess[index(x-i,y+i)] != color)                                        //当左下边第i格不为同色时，进入循环
                {
                    if ((x - i - 1) >= 0 && (y + i + 1) <= 7) { i += 1; continue; }         //若左下边第i格为异色且存在第i+1格，进入下一个循环
                    else return false;                                             //左下边第i格为异色且不存在第i+1格，不能在左下面吃子
                }
            return true;  
		}
		
		/**判断某点落子是否可以在右上侧吃子 
 		 * @param {Object} x      横坐标
 		 * @param {Object} y      纵坐标
 		 * @param {Object} color  棋子颜色
		 */
		function rightupValid (x,y,color) {
			var i = 2;
            if (x >= 6 || y <= 1 || chess[index(x+1,y-1)] == color || chess[index(x+1,y-1)] == empty || chess[index(x+1,y-1)] == validBlack || chess[index(x+1,y-1)] == validWhite) return false;      //x坐标大于5或右上边第一格为空或为同色时，不能在右上面吃子
            else if (chess[index(x+2,y-2)] == color) return true;                                 //右上边第一格为异色，第二格为同色，可以吃一子
            else                                                               
                while (chess[index(x+i,y-i)] != color)                                        //当右上边第i格不为同色时，进入循环
                {
                    if ((x + i + 1) <= 7 && (y - i - 1) >= 0) { i += 1; continue; }         //若右上边第i格为异色且存在第i+1格，进入下一个循环
                    else return false;                                             //右上边第i格为异色且不存在第i+1格，不能在右上面吃子
                }
            return true;  
		}
		
		//判断某点是否可以落子
        function valid(x,y,color)
        {
            if (leftValid(x,y,color) || righyValid(x,y,color) || upValid(x,y,color) || downValid(x,y,color) || leftupValid(x,y,color) || rightupValid(x,y,color) || leftdownValid(x,y,color) || rightdownValid(x,y,color)) return true;
            else return false;
        }
        
        //判断可落黑子的位置并标示
        function markValid (color)
        {
            for (i = 0; i < 8; i++){
                for (j = 0; j < 8; j++){
                    if (chess[index(i,j)] != white && chess[index(i,j)] != black) { chess[index(i,j)] = empty; }
                }
            }
            for (i = 0; i < 8; i++){
                for (j = 0; j < 8; j++){
                    if (chess[index(i,j)] == empty) { 
                    	if (valid(i,j,color)) chess[index(i,j)] = color*2; 
                    }
                }
            }      
            refresh(chess);      
        }
        
        //吃掉棋子
        function eatChessman(x,y,color) 
        {
        	chess[index(x,y)]=0-color;
            //吃掉上面的白子
            if(upValid(x,y,0-color)){
                	i=1;
                	while(chess[index(x,y-i)]==color){
                	chess[index(x,y-i)]=0-color;
                	i += 1;
                }
            }

            //吃掉下面的白子
            if (downValid(x,y,0-color)){
                    i=1;
                	while(chess[index(x,y+i)]==color){
                	chess[index(x,y+i)]=0-color;
                	i += 1;
                }
            }

            //吃掉左面的白子
            if (leftValid(x,y,0-color)){
                	i=1;
                	while(chess[index(x-i,y)]==color){
                	chess[index(x-i,y)]=0-color;
                	i += 1;
                }
            }

            //吃掉右面的白子
            if (righyValid(x,y,0-color)){
                	i=1;
                	while(chess[index(x+i,y)]==color){
                	chess[index(x+i,y)]=0-color;
                	i += 1;
                }
            }

            //吃掉左上面的白子
            if (leftupValid(x,y,0-color)){
                	i=1;
                	while(chess[index(x-i,y-i)]==color){
                	chess[index(x-i,y-i)]=0-color;
                	i += 1;
                }
            }

            //吃掉右上的白子
            if (rightupValid(x,y,0-color)){
                	i=1;
                	while(chess[index(x+i,y-i)]==color){
                	chess[index(x+i,y-i)]=0-color;
                	i += 1;
                }
            }

            //吃掉左下的白子
            if (leftdownValid(x,y,0-color)){
                	i=1;
                	while(chess[index(x-i,y+i)]==color){
                	chess[index(x-i,y+i)]=0-color;
                	i += 1;
                }
            }

            //吃掉右下的白子
            if (rightdownValid(x,y,0-color)){
                	i=1;
                	while(chess[index(x+i,y+i)]==color){
                	chess[index(x+i,y+i)]=0-color;
                	i += 1;
                }
            }
        }
		  
		 //alert(Math.floor(101/9));
  		//alert(valid(5,1,white)+"左"+leftValid(5,1,white)+"右"+righyValid(5,1,white)+"上"+upValid(5,1,white)+"下"+downValid(5,1,white)+"左上"+leftupValid(5,1,white)+"右上"+rightupValid(5,1,white)+"左下"+leftdownValid(5,1,white)+"右下"+rightdownValid(5,1,white))
	});
	
	flip = function(element, flipName, flipTime, unflipName, unflipTime) {  
    	if(!element){  
        	return;  
    	}  
    	element.style.webkitAnimation = "" + flipName + " " + flipTime;  
    	return $(element).bind('webkitAnimationEnd', function() {  
        	switch (element.style.webkitAnimationName) {  
            	case flipName:  
            	    return element.style.webkitAnimation = "" + unflipName + " " + unflipTime;break;  
            	case unflipName:  
                	return element.style.webkitAnimation = "" + flipName + " " + flipTime;break;  
        	}  
    	});  
	};  
  
	$(function() {  
    	//flip($("img")[10], 'flip', '1.5s', 'unflip', '0.7s');  
    	//flip($("img")[10], 'flip', '1.5s', 'unflip', '0.7s');  
	});  
	

})();
