<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validateTrigger="bind">
      <uni-forms-item name="project_id" label="项目ID">
        <uni-datetime-picker return-type="timestamp" v-model="formData.project_id"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="task_id" label="任务ID">
        <uni-easyinput placeholder="任务ID" v-model="formData.task_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="name" label="文件名称">
        <uni-easyinput placeholder="文件名称" v-model="formData.name"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="size" label="文件大小(B)">
        <uni-easyinput placeholder="创建时间" type="number" v-model="formData.size"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="ext" label="文件格式">
        <uni-easyinput placeholder="文件格式" v-model="formData.ext"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="path" label="文件地址">
        <uni-easyinput placeholder="文件地址" v-model="formData.path"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="thumb" label="缩略图">
        <uni-easyinput placeholder="缩略图" v-model="formData.thumb"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="userid" label="上传用户ID">
        <uni-easyinput placeholder="上传用户ID" v-model="formData.userid"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="download" label="下载次数">
        <uni-easyinput placeholder="下载次数" v-model="formData.download"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="created_at" label="创建时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.created_at"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="updated_at" label="更新时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.updated_at"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="deleted_at" label="删除时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.deleted_at"></uni-datetime-picker>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" style="width: 100px;" @click="submit">提交</button>
        <navigator open-type="navigateBack" style="margin-left: 15px;">
          <button class="uni-button" style="width: 100px;">返回</button>
        </navigator>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/project_task_files.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'project_task_files';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.includes(key)) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "project_id": null,
        "task_id": "",
        "name": "",
        "size": null,
        "ext": "",
        "path": "",
        "thumb": "",
        "userid": "",
        "download": "",
        "created_at": null,
        "updated_at": null,
        "deleted_at": null
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onLoad(e) {
      if (e.id) {
        const id = e.id
        this.formDataId = id
        this.getDetail(id)
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            title: '修改成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      },

      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        })
        db.collection(dbCollectionName).doc(id).field("project_id,task_id,name,size,ext,path,thumb,userid,download,created_at,updated_at,deleted_at").get().then((res) => {
          const data = res.result.data[0]
          if (data) {
            this.formData = data
            
          }
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>
