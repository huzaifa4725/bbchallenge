import { notification } from 'antd';
export enum NotificationType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}
export const showNotification = (
  notificationType: NotificationType,
  message: string,
  description: string
) => {
  if (notificationType === NotificationType.success) {
    notification.success({
      message: message,
      description: description,
    });
  } else if (notificationType === NotificationType.error) {
    notification.error({
      message: message,
      description: description,
    });
  } else if (notificationType === NotificationType.warning) {
    notification.warning({
      message: message,
      description: description,
    });
  } else if (notificationType === NotificationType.info) {
    notification.info({
      message: message,
      description: description,
    });
  }
};

export default showNotification;
