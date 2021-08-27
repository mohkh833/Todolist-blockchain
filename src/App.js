import React ,{useEffect ,useState} from 'react';
import Web3 from 'web3';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Todolistabi from './contracts/Todolist.json';
import Navbar from './Navbar';
import Bodys from './Body';

function App() {
    useEffect(() => {
      loadWeb3();
      LoadBlockChain();
    }, [])

  const[currentaccount, setCurrentaccount] = useState("");
  const[loader,setloader] = useState(true);
  const[Todolist, setTodolist] = useState();
  const[taskCount, setTaskCount] = useState();
  const[tasks, setTasks] = useState([]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }  
    else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const LoadBlockChain = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    
    const networkData = Todolistabi.networks[networkId];

    if(networkData){
      const list = new web3.eth.Contract(Todolistabi.abi, networkData.address);
      setTodolist(list);
      fetchData(list)
      setloader(false);
    }else{
      window.alert('The smart contract is not deployed in the current network');
    }
  }

  const createTask = async(content) => {
    setloader(true)
    await Todolist
    .methods
    .createTask(content)
    .send({from: currentaccount})
    .on('transactionhash', ()=> {
      console.log('Successfully added')
    })
    setloader(false)
    window.location.reload();
  }

  const compeleteTask = async(taskId) => {
    setloader(true)
    await Todolist
    .methods
    .CompeleteTask(taskId)
    .send({from: currentaccount})
    .on('completed', ()=> {
      console.log('Successfully Compeleted')
    })
    setloader(false)
    window.location.reload();
  }

  const fetchData = async (Todolist) => {
    const count = await Todolist.methods.taskCount().call()
    setTaskCount(count)
    let tasks = []
    for(let i=1; i <= count; i++) {
      const task = await Todolist.methods.tasks(i).call()
      tasks.push(task)
    }
    setTasks(tasks)
  }

  if(loader){
    return <div>Loading...</div>
  } 

  return (
    <div >
      <Navbar accounts = {currentaccount}/>
      <Bodys tasks = {tasks} createTask = {createTask} compeleteTask = {compeleteTask}/>
    </div>
  );
}

export default App;
