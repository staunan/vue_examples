<template>
<div class="price_filter">
    <div class="dropdown_trigger" @click="active = !active">
        <div v-if="isSelected" class="selectedContent">
            <div class="selectedText" v-text="selectedText"></div>
            <div class="clearButton" @click="clearPrice">
                <i class="fa fa-times-circle"></i>
            </div>
        </div>
        <span v-else>Price</span>
        <i class="fas fa-chevron-down arrow" />
    </div>
    <div class="dropdown_content" v-show="active">
        <div class="price_filter_item">
            <div class="filter_label">Price</div>
            <div class="slider_wrapper">
                <div class="min_label" v-text="MIN_ZIL_PRICE"></div>
                <div class="max_label" v-text="MAX_ZIL_PRICE"></div>
                <vue-slider v-model="price" :enable-cross="false" :min-range="1" :max-range="1000" :min="MIN_ZIL_PRICE" :max="MAX_ZIL_PRICE"></vue-slider>
            </div>
        </div>
    </div>
</div>
</template>
<script type="text/javascript">
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
export default {
    components: {VueSlider},
    props: ['selected'],
    data: function(){
        return {
            active: false,
            price: [1, 1000],
            MIN_ZIL_PRICE: 1,
            MAX_ZIL_PRICE: 1000,
            selectedPrice: {
                min: 0,
                max: 0
            },
            selectedText: ""
        };
    },
    computed:{
        isSelected: function(){
            return this.selectedPrice.min && this.selectedPrice.max;
        }
    },
    mounted: async function(){
        document.addEventListener('click', this.handleOutsideClick, true);
        if(this.selected && this.selected.min > 0){
            this.price = [this.selected.min, this.selected.max];
        }
    },
    watch: {
        price(p){
            this.selectedPrice.min = p[0];
            this.selectedPrice.max = p[1];
            this.selectedPrice = {...this.selectedPrice};
            this.$emit("priceChanged", this.selectedPrice);
            this.buildSelectedText();
        },
        selected(v){
            if(v && v.min > 0){
                this.price = [v.min, v.max];
            }
        },
    },
    methods: {
        buildSelectedText(){
            this.selectedText = this.selectedPrice.min.toString() + " - " + this.selectedPrice.max.toString();
        },
        handleOutsideClick: function(event){
            if(!event.target.closest(".dropdown_content")){
                this.active = false;
            }
        },
        clearPrice(){
            this.selectedPrice = {min:0, max:0};
            this.$emit("priceChanged", this.selectedPrice);
        }
    },

}
</script>
<style type="text/css" scoped>
.price_filter{
    display: flex;
    align-items: center;
    background: #333;
    position: relative;
}
.selectedContent{
    display: flex;
    align-items: center;
    background: #dc143c;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 5px;
    color: #fff;
    margin-right: 5px;
}
.selectedText{
    margin-right: 5px;
}
.dropdown_trigger{
    display: flex;
    align-items: center;
    height: 30px;
    padding: 5px;
    font-size: 13px;
    cursor: pointer;
}
.dropdown_trigger>span{
    margin-right: 5px;
}
.dropdown_content{
    position: absolute;
    left: 0;
    top: 32px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
    width: 200px;
    padding-bottom: 20px;
    max-height: 400px;
    background: #333;
    z-index: 110000;
}
.price_filter_item{
    padding: 10px;
    display: flex;
    cursor: pointer;
    color: #fff;
    flex-direction: column;
    padding-right: 20px;
    padding-left: 20px;
}
.filter_label{
    font-size: 13px;
    font-weight: bold;
    color: #fff;
    margin-right: -7px;
}
.slider_wrapper{
    padding-top: 20px;
    position: relative;
    margin-bottom: 20px;
}
.min_label, .max_label{
    top: -1px;
    font-size: 13px;
    color: #bfa75d;
    position: absolute;
    font-weight: bold;
}
.min_label{
    left: -0;
}
.max_label{
    right: 0;
}
</style>