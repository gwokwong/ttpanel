// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "project_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "项目ID"
  },
  "flow_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "流程IDID"
  },
  "name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "名称"
  },
  "status": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "状态"
  },
  "turns": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "可流转"
  },
  "userids": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "状态负责人ID"
  },
  "usertype": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "流转模式"
  },
  "userlimit": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "限制负责人"
  },
  "column_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "对应的项目列表"
  },
  "sort": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "排序"
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
