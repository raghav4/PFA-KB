# PFA-KB

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/47d7c3ec1ddee3da5075)

## Which database used and why?

According to the CAP Theorem, we could only have two of the "C", "A", and "P". Where "C" stands for **consistency**, "A" stands for **Availability** and "P" stands for **Partition Tolerance**. Since out of **Consistency** and **Availability**, for us, **availability** is more important and same goes for the **Partition Tolerance** which means, if the network between them breaks down and if the database can undergo graceful recall after the network is established again. **Partition Tolerance** is important for us as we cannot ensure that the network won't break down ever. Hence, to record the number of views we should go for MongoDB since availability and partition tolerance should be our priority, not the consistency. MongoDB will eventually be consistent or weak consistent afterwards and with big data, we wouldn't mind having a consistent number of views everywhere it could wait rather we would have an available system and it's easier to do sharding with mongodb.

## Scaling

```bash
# For Production - Cluster
npm run prod
# For Dev - Without Cluster
npm run dev

## Using pm2 with load balancer and metrices

## Fork Mode
npm run pm2_fork
## Cluster Mode
npm run pm2_cluster
```

## Load Testing Results using Siege

### Before

![Siege Load Testing](https://i.imgur.com/guBez4W.png)

### After

![Siege Load Testing](https://i.imgur.com/1DQOBY4.png)

Using `pm2 cluster mode - Load Balancer`
![pm2 load balancer cluster mode](https://i.imgur.com/31NLTBr.png)
