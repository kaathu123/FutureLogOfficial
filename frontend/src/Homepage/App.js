
const App = () => {
    return (
  
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Admin/*' element={<Admin />}></Route>
   
  
  
        </Routes>
  
    )
  }
  
  export default App