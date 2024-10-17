<template>
	<view class="uni-container">
		<uni-forms ref="form" :model="formData" validateTrigger="bind">
			<view class="">
				<div class="panel_header">
					<view class="title_1">{{formData.name}}</view>
					<div style="display: flex;">
						<view>这里放头像</view>
						<uni-icons type="personadd" size="24" color="#999"/>
					</div>
					<div style="display: flex;">
						<uni-icons type="search" size="24" color="#999" />
						<uni-icons type="gear" size="24" color="#999"/>
					</div>
					
				</div>
				<div>
					<view class="title_2">{{formData.desc}}</view>
				</div>
			</view>

			
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
	import {
		validator
	} from '../../js_sdk/validator/projects.js';

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
				}).catch(() => {}).finally(() => {
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
				db.collection(dbCollectionName).doc(id).field(
					"name,desc,userid,personal,user_simple,dialog_id,archived_at,archived_userid,created_at,updated_at,deleted_at"
				).get().then((res) => {
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
<style>
	.panel_header {
		transition-duration: .25s;
		transition-property: all;
		transition-timing-function: cubic-bezier(.4, 0, .2, 1);
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		padding-bottom: 0.25rem;
		padding-top: 0.25rem;
		background: #fff;
		justify-content: space-between;
		align-items: center;
		display: flex;
		border: 0 solid #e5e7eb;
		box-sizing: border-box;
		unicode-bidi: isolate;
	}

	.panel_header-line {
		display: flex;
	}

	.panel_header .title_1 {
		color: #000;
	}

	.panel_header .title_2 {
		color: #666;
	}
</style>