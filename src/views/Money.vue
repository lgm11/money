<template>
    <Layout class-prefix="layout">
        <div class="numberPad">
            <div class="output">100</div>
            <div class="buttons">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>删除</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>清空</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button class="ok">OK</button>
                <button class="zero">0</button>
                <button>.</button>
            </div>
        </div>
        <div>
            <ul class="type">
                <li class="selected">支出</li>
                <li>收入</li>
            </ul>
        </div>
        <div>
            <label class="notes">
                <span class="name">备注</span>
                <input type="text" placeholder="请输入备注">
            </label>
        </div>
        <div class="tags">
            <div class="new">
                <button>新增标签</button>
            </div>
            <ul class="current">
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
            </ul>
        </div>
    </Layout>
</template>

<script>
    export default {
        
    }
</script>
<style lang="scss">
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
</style>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
   .tags{
       flex-grow: 1;
       font-size: 14px;
       padding: 16px;
       display: flex;
       flex-direction: column-reverse;
       > .current{
           display: flex;
           margin-top: 3px;
           flex-wrap: wrap;
           > li{
               background: #D9D9D9;
               height: 24px;
               line-height: 24px;
               border-radius: 12px;
               padding: 0 17px;
               margin-right: 12px;
               
           }
       }
        > .new{
            > button{
                background:transparent ;
                border: none;
                color:#999999;
                border-bottom: 1px solid;
                padding: 0 3px;
            } 
            margin-top: 16px;
           }
    }
    .notes{
       display: block;
        font-size: 14px;
        padding:25px 0;
        background: #f5f5f5;
        > .name{
            padding-left: 16px;
        }
        > input{
            padding-left: 16px;
            border: none;
            background: #f5f5f5;
        }
    }
    .type{
        background: #c4c4c4;
        display: flex;
        text-align: center;
        > li{
            width: 50%;
            height: 64px;
            display: flex;
            font-size: 24px;
            justify-content: center;
            align-items: center;
            position: relative;
            &.selected{
                &::after{
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: #333;
                }
            }
        }
    }
    .numberPad{
        > .output{
            font-size: 36px;
            font-family: Consolas,monospace;
            padding:9px 16px;
            text-align: right;
            box-shadow: inset 0px -2px 3px rgba(0, 0, 0, 0.25)
        }
        > .buttons{
           @extend %clearfix;
            flex-wrap: wrap;
            > button{
                width: 25%;
                height: 64px;
                float: left;
                background: transparent;
                border: none;
                &.ok{
                    height: 128px;
                    float: right;
                }
                &.zero{
                    width: 50%;
                }
                $bg:#f2f2f2;
                &:nth-child(1){
                    background: $bg;
                }
                &:nth-child(2),&:nth-child(5){
                    background: darken($bg, 4%);
                }
                &:nth-child(3),&:nth-child(6),&:nth-child(9){
                    background: darken($bg, 8%);
                }
                &:nth-child(3),&:nth-child(6),&:nth-child(9){
                    background: darken($bg, 8%);
                }
                &:nth-child(4),&:nth-child(7),&:nth-child(10),&:nth-child(13){
                    background: darken($bg, 12%);
                }
                &:nth-child(8),&:nth-child(11){
                    background: darken($bg, 16%);
                }
                &:nth-child(14){
                    background: darken($bg, 20%);
                }
                &:nth-child(12){
                    background: darken($bg, 24%);
                }

            }
        }
    }
</style>