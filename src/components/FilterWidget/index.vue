<template>
<div class="filterNFT">
    <title-filter :selected="selectedTitle" @titleChanged="titleChanged"></title-filter>
    <sport-filter :selected="selectedSport" v-bind:type="type" @sportChanged="sportChanged"></sport-filter>
    <tag-filter :selected="selectedTags" @tagsChanged="tagsChanged"></tag-filter>
    <price-filter :selected="selectedPrice" @priceChanged="priceChanged"></price-filter>
</div>
</template>
<script type="text/javascript">
import SportFilter from "./SportFilter";
import TagFilter from "./TagFilter";
import TitleFilter from "./TitleFilter";
import PriceFilter from "./PriceFilter";
export default {
    components: {SportFilter, TagFilter, TitleFilter, PriceFilter},
    props: ['type'],
    data(){
        return {
            filteredData: {
                title: '',
                sport: null,
                tags: [],
                price: {
                    min: 0,
                    max: 0
                },
            },
            delayTimer: null,

            selectedTitle: "",
            selectedSport: "",
            selectedTags: "",
            selectedPrice: ""
        }
    },
    mounted: function(){
        this.selectedTitle = this.parseURL()['title'];
        this.selectedSport = this.parseURL()['sport'];
        this.selectedTags = this.parseURL()['tags'];
        this.selectedPrice = {min: this.parseURL()['minprice'], max: this.parseURL()['maxprice']};
    },
    methods: {
        parseURL: function(){
            var qs = (function(a) {
              if (a == "") return {};
              var b = {};
              for (var i = 0; i < a.length; ++i)
              {
                  var p=a[i].split('=', 2);
                  if (p.length == 1)
                      b[p[0]] = "";
                  else{
                    if(b[p[0]] !== undefined){
                      let arr = [b[p[0]]];
                      arr.push(decodeURIComponent(p[1].replace(/\+/g, " ")));
                      b[p[0]] = arr;
                    }else{
                      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
                    }
                  }
              }
              return b;
            })(window.location.search.substr(1).split('&'));
            return qs;
        },
        titleChanged(title){
            this.filteredData.title = title;
            this.buildFilter({title});
        },
        sportChanged(sport){
            this.filteredData.sport = sport;
            this.buildFilter({sport});
        },
        tagsChanged(tags){
            let tagSlugs = [...tags].map(function(tag){
                return tag.slug;
            });
            this.filteredData.tags = tagSlugs;
            this.buildFilter({tags: tagSlugs});
        },
        priceChanged(price){
            this.filteredData.price = price;
            this.buildFilter({price});
        },
        buildFilter(args){
            this.delayTimer && clearTimeout(this.delayTimer);
            this.delayTimer = setTimeout(async function () {
                this.$emit("filterChanged", {...this.filteredData, ...args});
            }.bind(this), 500);
        }
    }
}
</script>
<style type="text/css" scoped>
.filterNFT{
    display: flex;
    background: #120e0e;
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    align-items: center;
    padding-left: 10px;
    flex-wrap: wrap;
}
.filterNFT>div{
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>