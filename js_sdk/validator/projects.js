// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "name": {
    "rules": [
      {
        "format": "string"
      },
      {
        "minLength": 2,
        "maxLength": 20,
        "errorMessage": "{label}不能小于{minLength}个字符"
      }
    ],
    "label": "项目名称"
  },
  "desc": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "描述"
  },
  "userid": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "创建人"
  },
  "personal": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "是否个人项目"
  },
  "user_simple": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "成员总数"
  },
  "dialog_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "聊天会话ID"
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
    "label": "归档用户"
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
