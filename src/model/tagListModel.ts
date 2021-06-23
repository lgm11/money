type TagListModel = {
    data:string[]
    fetch:() => string[]
    create:(name:string) => 'success' | 'duplicated'
    save:() => void
}
const tagListModel:TagListModel = {
    data:[],
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem('tagList')||'[]')
        return this.data
    },//获取数据，读
    create(name:string){
        if(this.data.indexOf(name)>=0){return 'duplicated'}
        this.data.push(name)
        this.save()
        return 'success'
    },
    save(){
        window.localStorage.setItem('tagList',JSON.stringify(this.data))
    },//保存数据，写
    
}

export default tagListModel