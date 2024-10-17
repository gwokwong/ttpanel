<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validateTrigger="bind">
      <uni-forms-item name="parent_id" label="父级任务ID">
        <uni-easyinput placeholder="父级任务ID" v-model="formData.parent_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="project_id" label="项目ID">
        <uni-easyinput placeholder="项目ID" v-model="formData.project_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="column_id" label="列表ID">
        <uni-easyinput placeholder="列表ID" v-model="formData.column_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="dialog_id" label="聊天会话ID">
        <uni-easyinput placeholder="聊天会话ID" v-model="formData.dialog_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="flow_item_id" label="工作流状态ID">
        <uni-easyinput placeholder="工作流状态ID" v-model="formData.flow_item_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="flow_item_name" label="工作流状态名称">
        <uni-easyinput placeholder="工作流状态名称" v-model="formData.flow_item_name"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="name" label="标题">
        <uni-easyinput placeholder="标题" v-model="formData.name"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="color" label="颜色">
        <uni-easyinput placeholder="颜色" v-model="formData.color"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="desc" label="描述">
        <uni-easyinput placeholder="描述" v-model="formData.desc"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="start_at" label="计划开始时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.start_at"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="end_at" label="计划结束时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.end_at"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="archived_at" label="归档时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.archived_at"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="archived_userid" label="归档用户id">
        <uni-easyinput placeholder="归档用户id" v-model="formData.archived_userid"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="archived_follow" label="跟随项目归档（项目取消归档时任务也取消归档）">
        <uni-easyinput placeholder="跟随项目归档（项目取消归档时任务也取消归档）" type="number" v-model="formData.archived_follow"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="complete_at" label="完成时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.complete_at"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="userid" label="创建人id">
        <uni-easyinput placeholder="创建人id" v-model="formData.userid"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="visibility" label="任务可见性：1-项目人员 2-任务人员 3-指定成员">
        <uni-easyinput placeholder="任务可见性：1-项目人员 2-任务人员 3-指定成员" type="number" v-model="formData.visibility"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="p_level" label="优先级">
        <uni-easyinput placeholder="优先级" type="number" v-model="formData.p_level"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="p_name" label="优先级名称">
        <uni-easyinput placeholder="优先级名称" v-model="formData.p_name"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="p_color" label="优先级颜色">
        <uni-easyinput placeholder="优先级颜色" v-model="formData.p_color"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="sort" label="排序(ASC)">
        <uni-easyinput placeholder="排序(ASC)" type="number" v-model="formData.sort"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="loop" label="重复周期">
        <uni-easyinput placeholder="重复周期" v-model="formData.loop"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="loop_at" label="下一次重复时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.loop_at"></uni-datetime-picker>
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
      <uni-forms-item name="deleted_userid" label="删除的用户id">
        <uni-easyinput placeholder="删除的用户id" v-model="formData.deleted_userid"></uni-easyinput>
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
  import { validator } from '../../js_sdk/validator/project_tasks.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'project_tasks';

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
        "parent_id": "",
        "project_id": "",
        "column_id": "",
        "dialog_id": "",
        "flow_item_id": "",
        "flow_item_name": "",
        "name": "",
        "color": "",
        "desc": "",
        "start_at": null,
        "end_at": null,
        "archived_at": null,
        "archived_userid": "",
        "archived_follow": null,
        "complete_at": null,
        "userid": "",
        "visibility": null,
        "p_level": null,
        "p_name": "",
        "p_color": "",
        "sort": null,
        "loop": "",
        "loop_at": null,
        "created_at": null,
        "updated_at": null,
        "deleted_at": null,
        "deleted_userid": ""
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
        db.collection(dbCollectionName).doc(id).field("parent_id,project_id,column_id,dialog_id,flow_item_id,flow_item_name,name,color,desc,start_at,end_at,archived_at,archived_userid,archived_follow,complete_at,userid,visibility,p_level,p_name,p_color,sort,loop,loop_at,created_at,updated_at,deleted_at,deleted_userid").get().then((res) => {
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
