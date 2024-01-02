<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

> 统一代码风格、commit 风格，集成了 日志(winston)、JWT、TypeORM、全局异常处理、参数验证 等功能 的 Nest.JS 的项目模板

## 1. 启动

1. 在 `env/dev.env` 中设置环境变量

2. 安装依赖并启动

   ```shell
   pnpm i
   npm run dev
   ```

3. 示例路由 `src/routers/example`，中使用了 JWT、TypeORM 操作 MySQL、接口文档：[example 接口文档](https://2xwj5se0jg.apifox.cn/api-138245871)

4. 提交代码

   ```shell
   git cz
   ```

## 2. 目录结构说明

```
├─.husky ：git commit husky
├─env  ：环境变量，启动项目前需先设置相关环境变量
├─logs ：日志
└─src
    ├─decorator ：装饰器
    │  └─auth.decorator.ts    ：auth 装饰器，用于需要需要验证 token 的 接口
    │  └─typeorm.decorator.ts : 二次封装 typeorm 装饰器，目前封装了 CreateDateColumn、UpdateDateColumn 用于自动更新时间
    ├─global
    │  └─error.filter.ts          ： 全局异常过滤器，用于统一处理异常，并写入日志
    │  └─resCode.interceptor.ts   :  全局响应状态码拦截器，根据接口返回的code，统一设置 HTTP status 和 statusMessage 并 将失败请求写入日志
    │  └─validate.pipe.ts         :  全局参数验证管道
    │  └─service       :  全局服务
    │      ├─auth      ： token 校验相关服务
    │      ├─log       ： log 日志相关服务
    ├─routers   ：路由
    │  └─example：示例路由
    │      ├─dto                   ：路由参数 dto
    │      └─entities              ：数据库实体
    │      ├─example.controller.ts ：controller 层， 设置路由端点
    │      └─example.module.ts     ：module     层，负责提供服务、依赖注入等
    │      └─example.service.ts    ：service    层，负责逻辑处理
    ├─app.controller.ts     
    ├─app.module.ts         
    ├─app.service.ts     
    └─main.ts     				  ：入口文件
├─.cz-config.js   				  ：日志
├─.editorconfig   				  ：editorconfig 配置
├─.eslintrc.js    				  ：ESLint 配置
├─.gitignore      				  ：git版本管制忽略配置
├─.prettierrc.js         		   ：prettierrc 配置
├─commitlint.config.js   		   ：commitlint 配置
├─nest-cli.json     			   ：nest-cli 配置
├─ormlogs.log     				   ：TypeORM 日志
├─package.json    	 			   ：包配置文件
├─pnpm-lock.yaml   				   ：包版本控制文件
├─README.md         			   ：应用描述文件
├─tsconfig.build.json  			   ：TS 打包配置
└─tsconfig.json        			   ：TS 配置
```
