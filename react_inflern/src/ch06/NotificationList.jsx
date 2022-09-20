import React from "react";
import Notification from "./Notification";

const reservedNotifications = [
    {
        id: 1,
        message: "안녕하세요, 오늘 일정을 알려드립니다.",
    },
    {
        id: 2,
        message: "점심식사 시간입니다.",
    },
    {
        id: 3,
        message: "이제 곧 미팅이 시작됩니다.",
    },
];

var timer;

class NotificationList extends React.Component {
    constructor(props) {
        super(props);
        

        //처음 notifications라는 빈배열을 state에 넣음.
        //이처럼 생성자에서는 앞으로 사용할 데이터를 state에 넣어 초기화함.
        //그리고 클래스 컴포넌트의 생명주기 함수 중 하나인 componentDidMout함수에서는
        //자바스크립트의 setInterval함수를 사용하여 1초마다 정해진 작업을 수행하고 있음.
        // 이작업은 미리 만들어둔 알림 데이터배열인 reservedNotifications로부터 알림데이터를
        //하나씩 가져와서 state에 있는 notifications 배열에 넣고 업데이트하는 것.
        //여기서 주목할 점 > state를 업데이트하기 위해서 setState함수를 사용함. **

        this.state = {
            notifications: [],
        };
    }

    componentDidMount() {
        const { notifications } = this.state;
        timer = setInterval(() => {
            if (notifications.length < reservedNotifications.length) {
                const index = notifications.length;
                notifications.push(reservedNotifications[index]);
                this.setState({
                    notifications: notifications,
                });
            } else {
                this.setState({
                    notifications: [],
                });
                clearInterval(timer);
            }
        }, 1000);
    }

    // componentWillUnmount() {
    //     if (timer) {
    //         clearInterval(timer);
    //     }
    // }

    render() {
        return (
            <div>
                {this.state.notifications.map((notification) => {
                    return (
                        <Notification
                            key={notification.id}
                            id={notification.id}
                            message={notification.message}
                        />
                    );
                })}
            </div>
        );
    }
}

export default NotificationList;