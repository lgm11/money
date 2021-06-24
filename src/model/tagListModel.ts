type Tag = {
    id:string
    name:string
}
type TagListModel = {
    data:Tag[]
    fetch:() => Tag[]
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
        const names = this.data.map(item => item.name)
        if(names.indexOf(name)>=0){return 'duplicated'}
        this.data.push({id:name,name:name})
        this.save()
        return 'success'
    },
    save(){
        window.localStorage.setItem('tagList',JSON.stringify(this.data))
    },//保存数据，写
    
}

export default tagListModel