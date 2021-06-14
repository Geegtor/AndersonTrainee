
const empty = {};
const test = {
        name: "Jhon", 
        bag: {
            componets: 'coke', 
            tasks: {
                toDo: 3, 
                toDoList: {list: 'OMFG'}
            }
        },
        isAdmin: true, 
        isUser: false, 
        bird: "crow", 
        
    };

const rtrn = copyObjDeep(test);

describe("Initial check object Type", function() {  
    it(`Should be object type`, function() {
        assert.equal(typeof( copyObjDeep() ), 'object');
        });
});

describe("Object and result with different Link", function() {
    it(`Should have different links`, function() {
        assert.equal(test !== copyObjDeep(), true);
    });
});

describe("Result have same object keys", function() {     

    for ( let key in test ) {
        it(`Shoulde be same object key`, function() {
            assert.equal(key in rtrn, true);
        })
    }

    for ( let key in rtrn ) {
        it(`Shoulde be same object key in origin`, function() {
            assert.equal(key in test, true);
        })
    }
});

describe("Result have same properties value", function() {     
    digObj(rtrn);

    function digObj(obj, t = test) {
        
        for (let key in obj) {
            if (typeof( obj[key] ) === 'object') {                 
                it(`Object properties should have different links`, function() {
                    assert.equal(rtrn[key] !== t[key], true);
                });

                digObj(obj[key], t[key]); 
            }
            else {
                it(`Should have same property value`, function() {
                    assert.equal(rtrn[key] === test[key], true);
                });
            }
        }
    }
}); 