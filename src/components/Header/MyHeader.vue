<template>
	<div class="header">
		<div class="menu_item drawer_trigger" @click="handleDrawerClick">
			<font-awesome-icon :icon="myIcon" />
		</div>
		<div class="siteTitle">
			Vue Examples
		</div>
	</div>
</template>
<script type="text/javascript">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default {
	data() {
		return {
			myIcon: faBars,
		};
	},
	components: {
		FontAwesomeIcon,
	},
	methods: {
		handleDrawerClick(){
			this.$emit("drawer");
		}
	}
};
</script>
<style type="text/css" scoped>
.header {
	height: 50px;
	width: 100%;
	background: #cfd6ff;
	display: flex;
	align-items: center;
}
.menu_item{
	height: 50px;
	width: 50px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
}
.drawer_trigger:hover{
	background: #333;
	color: #fff;
}
.siteTitle{
	font-size: 24px;
	font-weight: bold;
	height: 50px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-left: 15px;
}
</style>