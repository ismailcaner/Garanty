import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// Bildirim izni isteği
const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.error('Bildirim izni reddedildi.');
    return false;
  }
  return true;
};

// Bildirim içeriği oluşturma fonksiyonu
const getNotificationContent = (item, days) => {
  return {
    title: 'Garanty',
    body: `Bir ürününüzün garanti süresi bitiyor.`,
  };
};

// Bildirim gönderme fonksiyonu
const sendNotification = async (item, days) => {
  try {
    const isPermissionGranted = await requestNotificationPermission();
    if (!isPermissionGranted) return;

    const notificationContent = getNotificationContent(item, days);

    await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: null, // Anlık bildirim
    });
    console.log('Bildirim gönderildi:', item.id);
  } catch (error) {
    console.error('Bildirim gönderme hatası:', error);
  }
};

// Bildirimleri planlama fonksiyonu
const scheduleNotifications = async (data) => {
  try {
    const notificationsScheduled = await AsyncStorage.getItem('notificationsScheduled');
    if (notificationsScheduled === 'true') {
      return; // Bildirimler zaten planlanmışsa, yeniden planlama yapma
    }

    data.forEach(async (item) => {
      if (item.bitistarih) {
        const bitisTarihi = new Date(item.bitistarih);
        const simdikiTarih = new Date();
        const bitisGunAyYil = new Date(bitisTarihi.getFullYear(), bitisTarihi.getMonth(), bitisTarihi.getDate());
        const simdikiGunAyYil = new Date(simdikiTarih.getFullYear(), simdikiTarih.getMonth(), simdikiTarih.getDate());

        const oneDay = 1000 * 60 * 60 * 24;
        const farkMilisaniye = Math.abs(bitisGunAyYil - simdikiGunAyYil);
        const farkGun = Math.ceil(farkMilisaniye / oneDay);

        const notificationDates = [180, 90, 30]; // 6 ay, 3 ay, 1 ay
        for (const days of notificationDates) {
          if (farkGun === days) {
            await sendNotification(item, days);
          }
        }
      }
    });

    await AsyncStorage.setItem('notificationsScheduled', 'true'); // Bildirimlerin planlandığını işaretle
  } catch (error) {
    console.error('Bildirim gönderme hatası:', error);
  }
};

// Arka plan görevini tanımlama
TaskManager.defineTask('notificationBackgroundTask', async () => {
  try {
    const jsonData = await AsyncStorage.getItem('data');
    if (jsonData !== null) {
      const data = JSON.parse(jsonData);
      await scheduleNotifications(data);
    }
    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.error('Arka plan görevi hatası:', error);
    return BackgroundFetch.Result.Failed;
  }
});

// Özel hook
export const useScheduledNotifications = () => {
  useEffect(() => {
    const registerBackgroundFetch = async () => {
      const taskName = 'notificationBackgroundTask';
      await BackgroundFetch.registerTaskAsync(taskName, {
        minimumInterval: 12 * 60 * 60, // 12 saat
        stopOnTerminate: false,
        startOnBoot: false,
      });

      console.log('Arka plandaki bildirim görevi başarıyla kaydedildi.');
    };

    registerBackgroundFetch();

    return () => {
      BackgroundFetch.unregisterTaskAsync('notificationBackgroundTask');
    };
  }, []);

  useEffect(() => {
    const fetchDataAndScheduleNotifications = async () => {
      try {
        const jsonData = await AsyncStorage.getItem('data');
        if (jsonData !== null) {
          const data = JSON.parse(jsonData);
          await scheduleNotifications(data);
        }
      } catch (error) {
        console.error('Veri getirme hatası:', error);
      }
    };

    fetchDataAndScheduleNotifications();
  }, []);
};
