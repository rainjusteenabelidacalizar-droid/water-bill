//SQL
const connection=require('../config/db');
exports.getAllUsers=(req,res)=>{
    connection.query('SELECT * FROM water_bills',(err,rows,fields)=>{ 
        if(err) throw err;
        res.json(rows);
    });
};

exports.hello=(req,res)=>{
    res.send ("Hello World!");
};

// GET (search)
exports.getUserById=(req,res)=>{
    const id=req.params.id;
    //SQL INJECTION
    connection.query("SELECT * FROM water_bills WHERE id=?",[id],(err,rows,fields)=>{
        if(err) throw err;
        
        if(rows.length > 0)
            res.json(rows)
        else
            res.status(404).json({message:"404 User not found!"})
    });
};

// IP ONLY
exports.getUserByIp=(req,res)=>{
    const ip=req.params.ip_address;
    connection.query("SELECT * FROM water_bills WHERE ip_address=?",[ip],(err,rows,fields)=>{
        if(err) throw err;
        
        if(rows.length > 0)
            res.json(rows)
        else
            res.status(404).json({message:"404 IP not found!"})
    });
};

// IP OR ADDRESS
exports.getUserByIpOrAddress=(req,res)=>{
    const searchValue=req.params.searchValue;
    connection.query("SELECT * FROM water_bills WHERE ip_address=? OR email=?",[searchValue,searchValue],(err,rows,fields)=>{
        if(err) {
            res.status(500).json({message:"Database query failed"});
            return;
        }
        
        if(rows.length > 0)
            res.json(rows)
        else
            res.status(404).json({message:"404 not found!"})
    });
};

// POST
exports.createUser=(req,res)=>{
    // DOM
    const {mnumber,cname,cmeters_used,tamount,status,id} = req.body;
    connection.query('INSERT INTO water_bills (meter_number,consumer_name,cubic_meters_used,total_amount,status,id) VALUES (?,?,?,?,?,?)',[mnumber,cname,cmeters_used,tamount,status,id], (err, result)=> {
        if(err) throw err;
        res.json({message: "Water bill created successfully", id:result.insertId});
    });
}

// PUT (UPDATE)
exports.updateUser=(req,res)=>{
    const {mnumber,cname,cmeters_used,tamount,status,id} = req.body;
    connection.query('UPDATE water_bills SET meter_number=?, consumer_name=?,cubic_meters_used=?, total_amount=?, status=? WHERE id=?',[mnumber,cname,cmeters_used,tamount,status,id], (err, result)=> {
        if(err) throw err;
        if(result.affectedRows>0)
            res.json({message: "Water bill updated successfully"});
        else
            res.status(404).json({message:"User not found"});
    });
}

// // PUT (UPDATE)
// exports.updateUser=(req,res)=>{
//     const {department} = req.body;
//     connection.query('UPDATE water_bills SET department=?',[department], (err, result)=> {
//         if(err) throw err;
//         if(result.affectedRows>0)
//             res.json({message: "User updated successfully"});
//         else
//             res.status(404).json({message:"User not found"});
//     });
// }

// DELETE
exports.deleteUser=(req,res)=>{
    connection.query('DELETE FROM water_bills',(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0)
            res.json({message:"User deleted successfully"})
        else
            res.status(404).json({message:"User not found"})
    });
}

