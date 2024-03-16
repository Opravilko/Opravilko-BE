
## /api/auth/login
```
in
{
  "username": string,
  "password": string
}

out
JWT or status code with message
{
  token: string
}
or
{
  message: string
}
```
## /api/auth/register
```
in
{
  "username": string,
  "email": string,
  "password": string,
  "role": string
}

out
status code with message
{
  message: string
}
```

# Od tukaj vsi endpointi pricakujejo tudi JWT ki ga dobis v login
```
npr /api/user/send body bo bil
{
  token: string,
  toUser: string,
  message: string,
}
```

## /api/user/list
```
in
{}

out
list of userNames
["user1", "user2"]
```

## /api/user/delete
```
in
{
  name:string
}

out
status code with message
```

## /api/user/update
```
in
{
  oldUsername: string
  name: string
  email: string@example.com
  password: string
  role: string
}

out
list of userNames
["user1", "user2"]
```

## /api/message/send
```
in
{
  "toUser": string,
  "message": string,
}

out
status code with message
{
  message: string
}
if status code 201 message object
{
  message: string,
}

```

## /api/message/with
```
in
{
  "user": string,
}

out
status code with message
{
  message: string
}
if status code 201 list of 
[{
  id: id,
  message: string,
  created_at: date,
  user: string
}]

```

## /api/message/delete
```
in
{
  "messageId": id,
}

out
status code with message
{
  message: string
}

```

## /api/task/list
```
in
{
}

out
status code with message
of list of task
{
  id: id
  taskName: string
  start_date: date
  due_date: date
  description: string
  users_assigned: list userName
}


```

## /api/task/create
```
in
{
  taskName: string
  start_date: date
  due_date: date
  description: string
  users_assigned: list userName
}

out
status code with message
{
  message: string
}
or 
{
  id: id
}

```

## /api/task/updateStatus
```
in
{
  teskId: id,
  status: bool
}

out
status code with message
{
  message: string
}

```

## /api/task/delete
```
in
{
  teskId: id,
}

out
status code with message
{
  message: string
}

```

## /api/task/points
```
in
{
  
}

out
status code with message
{
  points: number
}

```

## /api/task/my
```
in
{
  
}

out
status code with message
{
  points: number
}

```




