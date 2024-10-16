<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" :collection="collectionList" field="name,desc,userid,personal,user_simple,dialog_id,archived_at,archived_userid,created_at,updated_at,deleted_at" :where="queryWhere" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view>
          <text>项目名称</text>
          <text>{{data.name}}</text>
        </view>
        <view>
          <text>描述</text>
          <text>{{data.desc}}</text>
        </view>
        <view>
          <text>创建人</text>
          <text>{{data.userid}}</text>
        </view>
        <view>
          <text>是否个人项目</text>
          <text>{{data.personal}}</text>
        </view>
        <view>
          <text>成员总数</text>
          <text>{{data.user_simple}}</text>
        </view>
        <view>
          <text>聊天会话ID</text>
          <text>{{data.dialog_id}}</text>
        </view>
        <view>
          <text>归档时间</text>
          <uni-dateformat :threshold="[0, 0]" :date="data.archived_at"></uni-dateformat>
        </view>
        <view>
          <text>归档用户</text>
          <text>{{data.archived_userid}}</text>
        </view>
        <view>
          <text>创建时间</text>
          <uni-dateformat :threshold="[0, 0]" :date="data.created_at"></uni-dateformat>
        </view>
        <view>
          <text>更新时间</text>
          <uni-dateformat :threshold="[0, 0]" :date="data.updated_at"></uni-dateformat>
        </view>
        <view>
          <text>删除时间</text>
          <uni-dateformat :threshold="[0, 0]" :date="data.deleted_at"></uni-dateformat>
        </view>
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" class="btn-delete" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/panel_project.js'
  const db = uniCloud.database()

  export default {
    data() {
      return {
        queryWhere: '',
        collectionList: "panel_project",
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.queryWhere = '_id=="' + this._id + '"'
      }
    },
    methods: {
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: './list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
