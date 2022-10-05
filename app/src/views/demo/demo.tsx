import * as React from 'react'
import { Button, Input, Spin, Card } from 'antd'

import { withStore } from '@/core/store'

interface DemoProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface DemoState {
  resData: Partial<queryTestInfoUsingGET.Response>
  loading: boolean
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
}

@withStore(['count', { countAlias: 'count' }])
export default class Demo extends React.Component<DemoProps, DemoState> {
  // state 初始化
  state: DemoState = {
    resData: {},
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
  }

  // 构造函数
  constructor(props: DemoProps) {
    super(props)
  }

  componentDidMount(): void {
    console.log(this)
  }

  render(): JSX.Element {
    const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state
    const { count: reduxCount, countAlias } = this.props
    return (
      <div className="layout-padding">
       chinh123
        test
        test
        kakakaa

        ffff

        <p>This is version 1.0.3</p>
      </div>
    )
  }

  asyncDispatch = (dispatch: Dispatch): Promise<void> => {
    return new Promise((resolve) => {
      this.setState({ asyncDispatchLoading: true })
      setTimeout(() => {
        const { count } = this.props
        dispatch({ type: 'ACTION_ADD_COUNT', data: count + 1 })
        this.setState({ asyncDispatchLoading: false })
        resolve()
      }, 1000)
    })
  }

  openNewWindow = (): void => {
    this.setState({ createWindowLoading: true })
    $tools.createWindow('Demo').finally(() => this.setState({ createWindowLoading: false }))
  }

  requestTest(): void {
    this.setState({ loading: true })
    $api
      .queryTestInfo({})
      .then((resData) => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }

  requestTestError(): void {
    this.setState({ loading: true })
    $api
      .queryTestInfoError({})
      .catch((resData) => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }

  requestTestErrorModal(): void {
    this.setState({ loading: true })
    $api
      .queryTestInfoError({}, { errorType: 'modal' })
      .catch((resData) => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }
} // class Demo end
