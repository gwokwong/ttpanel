// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "parent_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "父级任务ID"
  },
  "project_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "项目ID"
  },
  "column_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "列表ID"
  },
  "dialog_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "聊天会话ID"
  },
  "flow_item_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "工作流状态ID"
  },
  "flow_item_name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "工作流状态名称"
  },
  "name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "标题"
  },
  "color": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "颜色"
  },
  "desc": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "描述"
  },
  "start_at": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "label": "计划开始时间"
  },
  "end_at": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "label": "计划结束时间"
  },
  "archived_at": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "label": "归档时间"
  },
  "archived_userid": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "归档用户id"
  },
  "archived_follow": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "跟随项目归档（项目取消归档时任务也取消归档）"
  },
  "complete_at": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "label": "完成时间"
  },
  "userid": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "创建人id"
  },
  "visibility": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "任务可见性：1-项目人员 2-任务人员 3-指定成员"
  },
  "p_level": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "优先级"
  },
  "p_name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "优先级名称"
  },
  "p_color": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "优先级颜色"
  },
  "sort": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "排序(ASC)"
  },
  "loop": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "重复周期"
  },
  "loop_at": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "label": "下一次重复时间"
  },
  "created_at": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "label": "创建时间"
  },
  "updated_at": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "label": "更新时间"
  },
  "deleted_at": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "label": "删除时间"
  },
  "deleted_userid": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "删除的用户id"
  }
}

const enumConverter = {}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
