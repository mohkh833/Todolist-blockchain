import React, { useState } from 'react';
const Bodys = ({createTask,tasks,compeleteTask}) =>{
    const[content, setContent] = useState()

    const onchange = (e) => {
        setContent(e.target.value)
    }
    
    const onsubmit = (e) => {
        e.preventDefault()
        createTask(content)
        
    }
    
    return(
        <div class="container">
            <div class="row ">
                <form onSubmit ={onsubmit}>
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            
                            <input type="submit" class="input-group-text btn btn-primary" id="inputGroup-sizing-sm" value= "Add your Task"   />
                        </div>
                            <input type="text"  class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={onchange}/>
                    </div>
                </form>
                <ul id ="taskList" class ="list-unstyled text-center " >
                { tasks.map((task, key) =>{
                    return(
                        <div className="taskTemplate" key={key}>
                        <label>
                          <input 
                            className='alert alert-primary'
                            type="checkbox"
                            defaultChecked={task.compeleted} 
                            onClick={e => {compeleteTask(task.id)}}/>
                          <span style={{textDecorationLine: task.compeleted === true ? 'line-through': 'none'}}>{task.content}</span>
                        </label>
                      </div>
                    )}
                    )
                }
                  
                </ul>
                <ul id="completedTaskList" class="list-unstyled">
                </ul>
            </div>
        </div>
    )
}
export default Bodys
