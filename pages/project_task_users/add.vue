<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validateTrigger="bind">
      <uni-forms-item name="project_id" label="项目ID">
        <uni-easyinput placeholder="项目ID" v-model="formData.project_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="task_id" label="任务ID">
        <uni-easyinput placeholder="任务ID" v-model="formData.task_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="task_pid" label="任务ID（如果是子任务则是父级任务ID）">
        <uni-easyinput placeholder="任务ID（如果是子任务则是父级任务ID）" v-model="formData.task_pid"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="userid" label="用户id">
        <uni-easyinput placeholder="用户id" v-model="formData.userid"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="owner" label="是否任务负责人">
        <uni-easyinput placeholder="是否任务负责人" type="number" v-model="formData.owner"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="created_at" label="创建时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.created_at"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="updated_at" label="更新时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.updated_at"></uni-datetime-picker>
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
  import { validator } from '../../js_sdk/validator/project_task_users.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'project_task_users';

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
        "project_id": "",
        "task_id": "",
        "task_pid": "",
        "userid": "",
        "owner": null,
        "created_at": null,
        "updated_at": null
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
