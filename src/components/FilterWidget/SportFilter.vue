<template>
<div class="sport_filter">
    <div class="dropdown_trigger" @click="active = !active">
        <div v-if="selectedSport !== null" class="selectedContent">
            <div class="selectedText" v-text="selectedText"></div>
            <div class="clearButton" @click="clearSelected">
                <i class="fa fa-times-circle"></i>
            </div>
        </div>
        <span v-else>Sport</span>
        <i class="fas fa-chevron-down arrow" />
    </div>
    <div class="dropdown_content" v-show="active">
        <div class="sportList">
            <div class="listItem" v-for="(sport, index) in sportsList" :key="'sport'+index" @click="selectSport(sport, index)" v-bind:class="{ 'selected_sport' : selectedSport == sport}">
                <span v-if="selectedSport == sport"><i class="fa fa-check" /></span>
                <div class="sportName" v-text="sport.title"></div>
            </div>
        </div>
    </div>
</div>
</template>
<script type="text/javascript">
import { mapGetters } from "vuex";
export default {
    props: ['type', 'selected'],
    data: function(){
        return {
            active: false,
            sportsList: [],
            selectedSport: null,
            selectedText: "",
        };
    },
    computed: {
        ...mapGetters({ getSportsList: "nfts/getExploreSportsList" }),
    },
    mounted: async function(){
        document.addEventListener('click', this.handleOutsideClick, true);
        this.sportsList = await this.getSportsList(this.type);
        if(this.selected){
            this.sportsList.forEach(function(sport){
                if(sport._id == this.selected){
                    this.selectSport(sport);
                }
            }.bind(this));
        }
    },
    destroyed: function(){
        document.removeEventListener('click', this.handleOutsideClick, true);
    },
    methods: {
        clearSelected(){
            this.selectedSport = null;
            this.selectedText = "";
            this.$emit('sportChanged', "");
        },
        handleOutsideClick: function(event){
            if(!event.target.closest(".dropdown_content")){
                this.active = false;
            }
        },
        selectSport: function(sport){
            this.selectedSport = sport;
            this.selectedText = sport.title;
            this.$emit('sportChanged', sport);
        },
    },

}
</script>
<style type="text/css" scoped>
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
.sportList{
    height: inherit;
    overflow-y: scroll;
}
.sport_filter{
    display: flex;
    align-items: center;
    background: #333;
    position: relative;
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
    min-height: 50px;
    max-height: 400px;
    background: #333;
    z-index: 110000;
}
.listItem.selected_sport{
    background: #bfa75d;
    color: #fff;
}
.listItem.selected_sport>*{
    color: #fff;
}
.listItem{
    display: flex;
    cursor: pointer;
    color: #fff;
    height: 30px;
    padding-right: 5px;
    align-items: center;
    width: 100%;
    font-size: 14px;
    padding-left: 10px;
    border-bottom: 1px solid #262626;
}
.listItem:hover *{
    color: black;
}
.listItem:hover{
    background: #fff;
    color: black;
}
.listItem .fa, .listItem .fas, .listItem svg{
    margin-right: 10px;
}
.sportName{
    display: inline-block;
    text-overflow: ellipsis;
}
</style>