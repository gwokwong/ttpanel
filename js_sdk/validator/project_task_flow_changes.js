// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "task_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "任务ID"
  },
  "userid": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "用户id"
  },
  "before_flow_item_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "（变化前）工作流状态ID"
  },
  "before_flow_item_name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "（变化前）工作流状态名称"
  },
  "after_flow_item_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "（变化后）工作流状态ID"
  },
  "after_flow_item_name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "（变化后）工作流状态名称"
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
