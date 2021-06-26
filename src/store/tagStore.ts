import tagListModel from "@/model/tagListModel"

export default{
    tagList : tagListModel.fetch(),
    createTag : (name:string)=>{
      const message = tagListModel.create(name)
        if(message === 'duplicated'){
          window.alert('标签名重复了')
        }else if(message === 'success'){
          window.alert('添加成功')
        }
    },
    removeTag:(id:string)=>{
        if(tagListModel.remove(id)){
            return true
        }else{
            return false
        }
    },
    updateTag:(id:string,name:string)=>{
      return tagListModel.update(id,name)
    },
    findTag(id:string){
      return this.tagList.filter(t => t.id === id)[0]
    }
}