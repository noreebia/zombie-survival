
    function Player(){
        this.x = WIDTH/2;
        this.y = HEIGHT/2;
        this.bullets = [];
        this.bulletNum = 5;
		
		this.radius = 15;
		
		this.barrelWidth = 3;
		this.barrelLength = 40;
        this.speed = 3;
		this.ammo=0;
		
        this.initBullets = function(){
            var i;
            for(i=0;i<this.bulletNum;i++){
                this.bullets.push(new Bullet() );
            }
        }
        
        this.move = function(){
            if(shouldPlayerMove[0] && this.y - this.radius - this.speed> 0  ){
				this.y = this.y - this.speed;
			}
			else if(shouldPlayerMove[1] && this.y + this.radius + this.speed < HEIGHT){
				this.y = this.y + this.speed;
			}
			if(shouldPlayerMove[2] && this.x - this.radius > 0){
				this.x = this.x - this.speed;
			}
			else if(shouldPlayerMove[3] && this.x + this.radius < WIDTH){
				this.x = this.x + this.speed;
			}
        }
        
        this.display = function(){
            ctx.beginPath();
	       	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	       	ctx.fill();      
			
			
			ctx.save();
			ctx.translate( this.x, this.y );
			ctx.rotate(angle);
		
			ctx.beginPath();
			ctx.arc(0, 0, this.radius, 0, Math.PI*2, true)
			ctx.fill();

			ctx.fillRect(0,-(this.barrelWidth/2), this.barrelLength, this.barrelWidth);
			ctx.restore();
			
        }
        
        this.run = function(){
            this.move();
            this.display();
            //this.countAmmo();
			
            var i;
            for(i = 0; i<this.bullets.length;i++){
                this.bullets[i].run();
            }
        }
        
        this.shoot = function(){
             var i;
             for(i=0;i<this.bullets.length;i++){
                if( !(this.bullets[i].active) ) {
                    this.bullets[i].shoot(mouseX, mouseY);   
                    break;         
                }    
            }
        }
		
		this.countAmmo = function(){
			var i;
			this.ammo = 0;
             for(i=0;i<this.bullets.length;i++){
                if( !(this.bullets[i].active) ) {
                    this.ammo++;       
                }    
            }
			return this.ammo;
		}
    }