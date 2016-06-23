btnImport(){
        if(this.editActive === false || this.action === 'edit' || this.action === ''){
            this.importActive = this.editActive = !this.editActive;
        }
        
    }
    
    btnNextPage(){
        this.currentStartIdx += this.currentLimit;
        this.subscribeToUsers();
    }
    btnPreviousPage(){
        this.currentStartIdx -= this.currentLimit;
        this.subscribeToUsers();
    }
    btnLoadMore(){
        this.getMoreUsers(this.currentLimit);
    }
    
    btnTmpCreateMany(){
        var i = 0;
        for(i = 0; i<1000; i++)
        {
            var newUser = new User('User_'+i, "User"+i+"@example.com",'User_'+i,'User_'+i);
            this.pushUser(newUser);
                
        }
    }
    btnTmpRemoveMany(){
        var i = 0;
        for(i = 0; i<1000; i++)
        {
            var newUser = new User('User_'+i, "User"+i+"@example.com",'User_'+i,'User_'+i);
            this.removeUser(newUser);
                
        }
    }
    
    btnClearUsers(){
        this.users = [];
    }
    
    // updates the current limit for user results
    limitChanged(value){
        if(!this.isInt(value)) return;
        this.currentLimit=value;
        this.subscribeToUsers();
    }
    
    // updates the current limit for user results
    pageChanged(value){
        if(!this.isInt(value)) return;
        this.currentStartIdx=value;
        this.subscribeToUsers();
    }
    
    // Checks if the given param is a number
    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }