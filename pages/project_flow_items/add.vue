<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validateTrigger="bind">
      <uni-forms-item name="project_id" label="项目ID">
        <uni-easyinput placeholder="项目ID" v-model="formData.project_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="flow_id" label="流程IDID">
        <uni-easyinput placeholder="流程ID" v-model="formData.flow_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="name" label="名称">
        <uni-easyinput placeholder="名称" v-model="formData.name"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="status" label="状态">
        <uni-easyinput placeholder="状态" v-model="formData.status"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="turns" label="可流转">
        <uni-easyinput placeholder="可流转" v-model="formData.turns"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="userids" label="状态负责人ID">
        <uni-easyinput placeholder="状态负责人ID" v-model="formData.userids"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="usertype" label="流转模式">
        <uni-easyinput placeholder="流转模式" v-model="formData.usertype"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="userlimit" label="限制负责人">
        <uni-easyinput placeholder="限制负责人" v-model="formData.userlimit"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="column_id" label="对应的项目列表">
        <uni-easyinput placeholder="对应的项目列表" v-model="formData.column_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="sort" label="排序">
        <uni-easyinput placeholder="排序" type="number" v-model="formData.sort"></uni-easyinput>
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
  import { validator } from '../../js_sdk/validator/project_flow_items.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'project_flow_items';

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
        "flow_id": "",
        "name": "",
        "status": "",
        "turns": "",
        "userids": "",
        "usertype": "",
        "userlimit": "",
        "column_id": "",
        "sort": null,
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
