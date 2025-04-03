import { toast } from '@/lib/npm';
import CommonMessage from '@/static/commonMessage';

const AUTO_CLOSE_TIMEOUT = 5000;

class NotificationService {
  showSuccessMessage(titleOrMessage: string, description?: string, duration?: number) {
    if (!description && !titleOrMessage) {
      titleOrMessage = `${CommonMessage.Success}`;
      description = `${CommonMessage.SuccessOperation}`;
    } else if (!description) {
      titleOrMessage = titleOrMessage
      description = ''
    }

    if (typeof duration === 'undefined') {
      duration = AUTO_CLOSE_TIMEOUT;
    }

    const toastOptions = {
      description,
      duration,
      classNames: {
        toast: "custom_tost",
        closeButton: 'toaster_close_icon',
      }
    };

    toast.success(titleOrMessage, toastOptions);

  }

  showErrorMessage(titleOrMessage: string, description?: string, duration?: number) {
    if (!description && !titleOrMessage) {
      titleOrMessage = `${CommonMessage.Error}`;
      description = `${CommonMessage.ErrorOperation}`;
    } else if (!description) {
      titleOrMessage = titleOrMessage
      description = ''
    }

    if (typeof duration === 'undefined') {
      duration = AUTO_CLOSE_TIMEOUT;
    }

    const toastOptions = {
      description,
      duration,
      classNames: {
        toast: "custom_tost",
        closeButton: 'toaster_close_icon',
      }
    };

    toast.error(titleOrMessage, toastOptions);
  }

  showInfoMessage(titleOrMessage: string, description?: string, duration?: number) {
    if (!description && !titleOrMessage) {
      titleOrMessage = `${CommonMessage.Info}`;
      description = `${CommonMessage.InfoOperation}`;
    } else if (!description) {
      titleOrMessage = titleOrMessage
      description = ''
    }

    if (typeof duration === 'undefined') {
      duration = AUTO_CLOSE_TIMEOUT;
    }

    const toastOptions = {
      // position: toast.POSITION.TOP_RIGHT,
      // closeButton: true,
      description,
      duration,
      classNames: {
        toast: "custom_tost",
        closeButton: 'toaster_close_icon',
      }
    };

    toast.info(titleOrMessage, toastOptions);
  }

  showWarningMessage(titleOrMessage: string, description?: string, duration?: number) {
    if (!description && !titleOrMessage) {
      titleOrMessage = `${CommonMessage.Warning}`;
      description = `${CommonMessage.WarningOperation}`;
    } else if (!description) {
      titleOrMessage = titleOrMessage
      description = ''
    }

    if (typeof duration === 'undefined') {
      duration = AUTO_CLOSE_TIMEOUT;
    }

    const toastOptions = {
      // position: toast.POSITION.TOP_RIGHT,
      // closeButton: true,
      description,
      duration,
      classNames: {
        toast: "custom_tost",
        closeButton: 'toaster_close_icon',
      }
    };

    toast.warning(titleOrMessage, toastOptions);
  }

}

export default new NotificationService();
