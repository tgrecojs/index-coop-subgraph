## tasklist
* [] Add gas properties to graphql.schema entities
* [] write logic for saving these new gas properties within the event handler fns
    * ex. `feeEntity.gasUsed = event.transaction.gasUsed;`
    * look to handleRebelanced fn for example of this.

### Nested Entities
* Find out how to successfully index nested entities
    * Currently the query below returns null for the manager entity.
    * Ex.
    ```
    setToken {
        manager {
            address
        }
    }
    ```
* Figure out how to update array values within entities.
    * ex. feeAccrualHistory inside of Manager entity.
    * currently the code is always setting this value to an empty array.
    * worth analyzing the createManager fn being used to create new managers.