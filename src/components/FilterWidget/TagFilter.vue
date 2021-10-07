<template>
<div class="tag_filter">
    <div class="dropdown_trigger" @click="active = !active">
        <span>Tags</span>
        <span class="counter" v-show="totalTagSelected > 0" v-text="totalTagSelected"></span>
        <i class="fas fa-chevron-down arrow" />
    </div>
    <div class="dropdown_content" v-show="active">
        <div class="tagList">
            <div class="listItem" v-for="(tag, index) in tags" :key="'tag'+index" @click="selectTags(tag, index)" v-bind:class="{ 'selected_tag' : selectedTags.has(tag) }">
                <span v-if="selectedTags.has(tag)"><i class="fa fa-check" /></span>
                <div class="tagName" v-text="tag.name"></div>
            </div>
        </div>
    </div>
</div>
</template>
<script type="text/javascript">
import { mapGetters } from "vuex";
export default {
    props: ['selected'],
    data: function(){
        return {
            active: false,
            selectedTags: new Set(),
            tags: [],
        };
    },
    computed: {
        ...mapGetters({ 
            getTags: "nfts/getAllActiveTags" 
        }),
        totalTagSelected: function(){
            return this.selectedTags.size;
        }
    },
    mounted: async function(){
        document.addEventListener('click', this.handleOutsideClick, true);
        let data = await this.getTags();
        if(data && data.length){
            this.tags = data.map(function(tag){
                tag.selected = false;
                return tag;
            });
        }
        if(this.selected && this.selected.length){
            let t = new Set();
            this.tags = this.tags.map(function(tag){
                if(this.selected.includes(tag.slug)){
                    tag.selected = true;
                    t.add(tag);
                }
                return tag;
            }.bind(this));
            this.selectedTags = t;
            this.$emit('tagsChanged', t);
        }
    },
    watch: {
        selected: function(newTags){
            let sel = new Set();
            this.tags = this.tags.map(function(tag){
                if(newTags.includes(tag.slug)){
                    tag.selected = true;
                    sel.add(tag);
                }
                return tag;
            });
            this.selectedTags = sel;
            this.$emit('tagsChanged', sel);
        }
    },
    destroyed: function(){
        document.removeEventListener('click', this.handleOutsideClick, true);
    },
    methods: {
        handleOutsideClick: function(event){
            if(!event.target.closest(".dropdown_content")){
                this.active = false;
            }
        },
        selectTags: function(tag){
            if (this.selectedTags.has(tag)) {
                this.selectedTags.delete(tag);
            }else{
                this.selectedTags.add(tag);
            }
            this.selectedTags = new Set(this.selectedTags);
            this.$emit('tagsChanged', this.selectedTags);
        },
    },

}
</script>
<style type="text/css" scoped>
.counter{
    border-radius: 50%;
    height: 20px;
    width: 20px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: crimson;
    margin-right: 10px;
}
.tagList{
    height: inherit;
    overflow-y: scroll;
}
.tag_filter{
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
    min-height: 200px;
    max-height: 400px;
    background: #333;
    z-index: 110000;
}
.listItem.selected_tag{
    background: #bfa75d;
    color: #fff;
}
.listItem.selected_tag>*{
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
.tagName{
    display: inline-block;
    text-overflow: ellipsis;
}
</style>