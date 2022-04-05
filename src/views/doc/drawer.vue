<template>
<markdown-preview :source="source" />
</template>
<script>
import MarkdownPreview from '@uivjs/vue-markdown-preview';
import '@uivjs/vue-markdown-preview/markdown.css';
let source = `
# Drawer component

## props

### position
The **position** prop has two value **left** and **right**. The **left** value places the drawer on the left side of the main page, and **right** value places the drawer on the right side of the page.

### width
The **width prop sets the width of the drawer. The default value is **400px**. You should provide value along with the unit. For example, **350px**, **40%**, **5em** etc.

### active
This prop controls the visibility of the drawer. If **true**, the drawer will be visible. If **false**, the drawer will be hidden.

### behaviour
This property has one value which is **dock**. If this value is present, then the drawer will be docked with the main content. Means you can see drawer and the content side by side. The default behaviour is that the drawer is placed on the top of the main content and in this behaviour, the left side of the main content gets hidden as drawer comes on top of it. But for **dock** value, you will be able to see the main content fully when the drawer is visible.

## Events

### close
This event gets fired when you close the drawer. When you click on the drawer overlay, the drawer gets closed. That time this event gets fired.

## Future Implementation
1. Currently the drawer gets closed whenever you click on the overlay. Make it configurable through prop.
1. Create drak and white version of overlay through prop.

`;
export default {
    components: {MarkdownPreview},
    data: function(){
        return {
            source: source
        }
    },
    mounted: function(){
        console.log(this.source);
    }
}
</script>
