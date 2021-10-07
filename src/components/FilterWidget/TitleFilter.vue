<template>
<div class="nftTitle">
	<input type="text" v-model="nftTitle" placeholder="Title">
	<div v-show="nftTitle != ''" class="close_icon" @click="nftTitle = ''">
		<i class="fa fa-times-circle" />
	</div>
</div>	
</template>
<script type="text/javascript">
export default{
	props: ['selected'],
	data: function(){
		return {
			nftTitle: "",
		}
	},
	mounted(){
		this.nftTitle = this.selected;
	},
	watch: {
		nftTitle(newTitle){
			this.$emit("titleChanged", newTitle);
		},
		selected:function(val){
			if(val == undefined){
				this.nftTitle = "";	
			}else{
				this.nftTitle = val;
			}
		}
	}
}
</script>
<style type="text/css">
.nftTitle{
	position: relative;
}
.nftTitle>input{
	padding-right: 30px;
	height: 30px;
	padding-left: 10px;
	color: #fff;
	font-size: 13px;
	border: none;
	background: #333;
	border-radius: 0;
	outline: none;
}
.close_icon{
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: 3px;
	cursor: pointer;
	color: #fff;
	top: 50%;
	height: 20px;
	width: 20px;
	border-radius: 50%;
	background: transparent;
	transform: translateY(-50%);
}
</style>