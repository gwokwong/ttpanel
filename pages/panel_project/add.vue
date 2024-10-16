<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
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
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/panel_project.js';

  const db = uniCloud.database();
  const dbCollectionName = 'panel_project';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
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
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
  }

  .uni-button {
    width: 184px;
  }
</style>
