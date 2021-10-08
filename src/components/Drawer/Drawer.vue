<template>
<div  v-show="drawerActive" class="drawer" v-bind:class="{ 'drawerRight' : position == 'right', 'drawerLeft' : position == 'left' || position == undefined }" @click="tryClose">
	<div class="drawerOverlay" @click="close"></div>
	<div class="drawerContent" v-bind:class="getDrawerContentClass()">
		<slot></slot>
	</div>
</div>
</template>
<script type="text/javascript">
export default{
	props: ['position', 'width', 'active', 'behaviour'],
	data: function(){
		return {
			drawerActive: false,
		};
	},
	mounted(){
		this.setWidth(this.width);
	},
	watch: {
		width(value){
			this.setWidth(value);
		},
		active: function(status){
			if(status === true){
				this.open();
			}else{
				this.close();
			}
		},
	},
	methods: {
		tryClose: function(event){
			if(event.target.closest(".drawerOverlay")){
				this.close();
			}
		},
		setWidth: function(value){
			let el = this.$el.querySelector(".drawerContent");
			if(value){
				el.style.width = value;
				el.style.maxWidth = value;
			}else{
				el.style.width = "400px";
				el.style.maxWidth = "400px";
			}
		},
		getDrawerContentClass(){
			let style = {};
			if(this.width){
				style.width = this.width;
			}
			return style;
		},
		open: function(){
			this.drawerActive = true;
			setTimeout(function(){
				if (this.behaviour === "dock") {
					if (screen.width>600) {
						let content = this.$el.querySelector(".drawerContent");
						if(content){
							if (this.position == "right") {
								document.documentElement.style.paddingRight = this.$el.style.width = content.clientWidth+"px";
							}else{
								document.documentElement.style.paddingLeft = this.$el.style.width = content.clientWidth+"px";
							}
						}
					}
				}
			}.bind(this), 0);
		},
		close: function(){
			this.drawerActive = false;
			if (this.behaviour === "dock") {
				if (screen.width>600) {
					if (this.position == "right") {
						document.documentElement.style.paddingRight = "0px";
					}else{
						document.documentElement.style.paddingLeft = "0px";
					}
				}
			}
			this.$emit("close");
		},
	}
}
</script>
<style type="text/css">
.drawer{
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
	bottom: 0;
	z-index: 1000;
}
.drawer .drawerContent{
	height: inherit;
	z-index: 10;
	background: #fff;
	position: absolute;
	top: 0;
	box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
}
.drawer .drawerOverlay{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100vh;	
	background: rgba(10,10,10,.86);
	z-index: -1;
}
/* Drawer Right*/
.drawer.drawerRight{
	right: 0;
}
.drawer.drawerRight .drawerContent{
	right: 0;
}
/* Drawer Left */
.drawer.drawerLeft{
	left: 0;
}
.drawer.drawerLeft .drawerContent{
	left: 0;
}
@media only screen and (max-width: 600px) {
	
}
</style>