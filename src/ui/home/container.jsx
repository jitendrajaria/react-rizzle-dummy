import React,{Component} from 'react'
import service  from './service'
import HomeComponent from './component';

export default class HomeContainer extends Component {
 
  constructor(props) {
    super(props);
    this.state={
      videos:[]
    }
  }
  
  componentDidMount(){
   this.setState({videos:service.getAllVideos()})
  }

  render() {
    return (
      <div className="d-flex justify-align-content h-100">
        <HomeComponent videosArray={this.state.videos}></HomeComponent>
      </div>
    )
  }
}
