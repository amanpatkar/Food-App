Episode 2:

#Parcel
-> -D stands for Dev Dependency || Types 1)normal 2) Dev Dependency
->Deb Build
->Local Server
->HMR = Hot Module Replacement
->File Watching Algo (Written in c++)
->Caching -Faster Builds
->Image Optimization
->Minification of File
->Bundling
->Compressing
->Consistent Hashing
->Code splitting
->Differential Bundeling - support older browsers
->Diagonostic
->Error Handeling
->HTTPS
->Tree Shaking -remove unused code

*****Remove main: App.js from package before npx parcel build index.html
-----------
Episode 3:

->Write script in package json
    "start": "parcel index.html",
    "build": "parcel build index.html",
->since 'start' is reserved keyword in npm npm run start == npm start 

#JSX
->JSX is a HTML like syntax (is not HTML inside JS)
->to give attributes to jsx use CAMEL CASE, example class == className
->If multiline JSX write it b/w ()

#React component
#Functional component 
-> JS functions whihc returns react element
->Name start with capital eg: 
const HeadingComponent = () =>{
    return <h1 id='heading' className="heading">This is JSX Heading 🚀</h1>
}
->Component Composition: Compositing two components in one another
-----
Episode 4 (Food odering App - 1)

#App basic layput planning
Header
  -Logo
  -Nav Items
Body
  -Search
  -Retraunt Contaner
    -Restrant Card
Footer
  -Copyrights
  -Link
  -Contact Info

#Props: Arguements passed to functional components
->Destructuring of props
#Config Driven UI
#Clodinary--->CDN for images
#Whenever iterating through a list pass 'key' (reserved keyword) to uniquely identify an element  
#It is not recommended use index or iterator as 'key' as it may change and it is an ANTI-PATTERN 
----
Episode 5 (Food odering App - 2)
#Best practice is to create seperate files for separate components
#Keep name of the component file similar to the functional component same (function name)
#Never Keep a hardcoded Data in a component file
#Two Types of import/export - a)Default b)Named
#To import named exports we have to use {} when importing
#Event Handlers

*React Hooks
->State- Super powerful varible
->Hook : Normal JS Utility function given by React
->Type of Hooks:
  ->useState() - Superpowerful state var in react
  ->useEffect()
 
 #useState()
  ->To Create useState: 
    let [state,setState] = useState(initialstate);

  Example:
    let [listOfRestraunt,setListofRestraunt] = useState([]) is similar to let listOfRestraunt;
  
  #useState() will return an array [state,setState] where on first index it returns state var and on second it return function that will take a modified value of state.

  ->Nomenclature of setState function should be "set" + name of State variable

  #Whenever a state var updates react re-renders the component

  #Super Powers of React:-
    -React usess Reconcilition Algo also known as react fibre
    -Virtual Dom: Virtual DOM is representation of actual DOM
-----
Episode 6
#Monolith and Microservice Architechture
#Microservice Architechture: - Seperation of concerns (Single responsibility)
#useEffect(cb,dependancyArr)
  ->useEffect(()=>{
    console.log('Use Effect is called')
  },[])

->If we have to manipulate DOM after re-rendering/rendring of DOM do it in useEffect()
#Shimmer UI - Show skeleton till Data is available
#Whenever state var changes React will re-render compoment and component will get updated values
#Whenever local state var is changes - React re-renders component
--------
Episode 6,6.1
-How to handle corse issue, after disabling the cors plugin
-corsproxy.io:
-Add cors proxy url before your API
------
Episode 7
-If no dependency array useEffect will be called on every componenet render
-If the dependecy array is empty, then useEffect is called on initial render and just once.
-If dependency array is defined, then useEffect is called whenenvever it is updated, useEffect(()+>{
  console.log('Hello');
},[btnNameReact])

-Never create state var outside component
-Nerver create useState inside if-else as it can create inconsisitency 

#Routes
- import React Router DOM
  -Ex: import {createBrowserRouter,RouterProvider}
-Set router configuration
  EX: const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout/>
    },
    {
       path: '/about',
      element: <About/>
    }
  ])
-React router gives a special hook - 'useRouterError'
#Whenever a function starts with use it is a hook in react

#Children routes
- <Outlet> is used to render the children route component on route change 
-<Outlet> will be replaced by children component 

#Never use an anchor tag when you want to navigate through pages when using React as it will reload the whole page instead use <Link to '/'></Link>
->Above is the reason why we call React a SPA (Single Page Application)

-There are two types of routing that we can have in web app
  -Client Side Routing 
  -Server Side Routing 

#Dynamic Routing
-Dyamic part is represented by ':' for example
  {
    path: '/restraunt/:resId',
    element: <RestrauntMenu/>
  }
#useParams hook
