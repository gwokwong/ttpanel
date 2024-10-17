<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validateTrigger="bind">
      <uni-forms-item name="name" label="项目名称">
        <input placeholder="项目名称" @input="binddata('name', $event.detail.value)" class="uni-input-border" v-model="formData.name"></input>
      </uni-forms-item>
      <uni-forms-item name="desc" label="描述">
        <input placeholder="描述" @input="binddata('desc', $event.detail.value)" class="uni-input-border" v-model="formData.desc"></input>
      </uni-forms-item>
      <uni-forms-item name="userid" label="创建人">
        <uni-easyinput placeholder="创建人" type="number" v-model="formData.userid"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="personal" label="是否个人项目">
        <uni-easyinput placeholder="是否个人项目" type="number" v-model="formData.personal"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="user_simple" label="成员总数">
        <uni-easyinput placeholder="成员总数" type="number" v-model="formData.user_simple"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="dialog_id" label="聊天会话ID">
        <uni-easyinput placeholder="聊天会话ID" v-model="formData.dialog_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="archived_at" label="归档时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.archived_at"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="archived_userid" label="归档用户">
        <uni-easyinput placeholder="归档用户" v-model="formData.archived_userid"></uni-easyinput>
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
  import { validator } from '../../js_sdk/validator/projects.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'projects';

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
        "name": "",
        "desc": "",
        "userid": null,
        "personal": null,
        "user_simple": null,
        "dialog_id": "",
        "archived_at": null,
        "archived_userid": "",
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
        db.collection(dbCollectionName).doc(id).field("name,desc,userid,personal,user_simple,dialog_id,archived_at,archived_userid,created_at,updated_at,deleted_at").get().then((res) => {
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
