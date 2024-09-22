import telebot
import webbrowser
import requests
import sqlite3
import json
from telebot import types
from currency_converter import CurrencyConverter
from telebot.types import WebAppInfo

bot=telebot.TeleBot("7520658703:AAFXMCMSUgAzDWSv9jezSXdlDmiJiQ6gGos")
currency=CurrencyConverter()
API = 'dcf486a78f2b8e898c4b1a464a1b31e1'

weather_bool=False
amount=0

@bot.message_handler(commands=['start'])
def start(message):
    
    bot.send_message(message.chat.id,'Тестовый бот\nЕго возмжности:\n/weather - показывает погоду в заданном городе\n/current-переводчик валют')




@bot.message_handler(commands=['weather'])
def weather(message):
    global weather_bool
    weather_bool=True
    bot.send_message(message.chat.id,'Введите название города ')
    bot.register_next_step_handler(message, weather_info)

def weather_info(message):
    try:
        city = message.text.strip().lower()
        weather_temeratura = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API}&units=metric')
        weather_data = json.loads(weather_temeratura.text)
        t=weather_data['main']['temp']
        bot.reply_to(message,f'Сейчас погода: {t}')
    except Exception:
        bot.send_message(message.chat.id,'Что-то пошло не такю. Введите заново')
        bot.register_next_step_handler(message, weather_info)






@bot.message_handler(commands=['current'])
def current(message):
    bot.send_message(message.chat.id,'Введите сумму')
    bot.register_next_step_handler(message, summa)

def summa(message):
    global amount
    try:
        amount = int(message.text.strip())
    except ValueError:
        bot.send_message(message.chat.id,'Неверный формат, напишите число')
        bot.register_next_step_handler(message, summa)
        return
    if (amount>0):
        markup = types.InlineKeyboardMarkup(row_width=2)
        btn2 = types.InlineKeyboardButton('EUR/USD', callback_data='eur/usd')
        btn1 = types.InlineKeyboardButton('USD/EUR', callback_data='usd/eur')
        btn3 = types.InlineKeyboardButton('Другое значение', callback_data='else')
        markup.add(btn1, btn2, btn3)
        bot.send_message(message.chat.id,'Выберите пару валют',reply_markup=markup)
    else:
        bot.send_message(message.chat.id,'число должно быть больше 0, напишите число')
        bot.register_next_step_handler(message, summa)

@bot.callback_query_handler(func=lambda call:True)
def callback(call):
    if (call.data!='else'):
        values=call.data.upper().split('/')
        res=currency.convert(amount,values[0],values[1])
        bot.send_message(call.message.chat.id,f'Получаеться: {round(res,2)}')
    else:
         bot.send_message(call.message.chat.id,'Напишите пару значение через "/"')
         bot.register_next_step_handler(call.message, my_currency)

def my_currency(message):
    try:
        values=message.text.upper().split('/')
        res=currency.convert(amount,values[0],values[1])
        bot.send_message(message.chat.id,f'Получаеться: {round(res,2)}')
    except  Exception:
        bot.send_message(message.chat.id,'Что-то не так. Пишите значение правильно')
        bot.register_next_step_handler(message, my_currency)



@bot.message_handler(commands=['shop'])
def shop(message):
    markup=types.InlineKeyboardMarkup()
    btn1=types.InlineKeyboardButton('Открыть веб страницу',web_app=WebAppInfo(url = "https://itproger.com"))
    markup.add(btn1)
    bot.send_message(message.chat.id,'Добро пожаловать в магазин',reply_markup=markup)

bot.polling(none_stop=True)



























# @bot.message_handler(commands=['start'])
# def start(message):
#     markup=types.ReplyKeyboardMarkup()
#     btn1=types.KeyboardButton("Удалить текст")
#     btn2=types.KeyboardButton("Изменить текст")
#     markup.add(types.KeyboardButton('Перейти на сайт'))
#     markup.add(btn1,btn2)
#     file = open('./foto.jpg','rb')
#     file_music = open('./music.mp3','rb')
#     # bot.send_photo(message.chat.id, file,reply_markup=markup)
#     # bot.send_audio(message.chat.id, file_music,reply_markup=markup)


#     # conn = sqlite3.connect('itproger.sql')
#     # cur = conn.cursor()
#     # cur.execute('CREATE TABLE IF NOT EXISTS users (id int auto_increment primary key, name varchar(50), pass varchar(50))')
#     # conn.commit()
#     # cur.close()
#     # conn.close()
#     # bot.send_message(message.chat.id,'Привет, сечас тебя зарегестрируем! Введите ваше имя')

#     bot.send_message(message.chat.id,'Введите название города ')

#     # bot.register_next_step_handler(message,user_name)

# @bot.message_handler(content_types=['text'])
# def get_weather(message):
#     city = message.text.strip().lower()
#     weather_temeratura = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={weather_API}&units=metric')
#     # weather_data = json.loads(weather_temeratura.text)
#     # t=weather_data['main']['temp']
#     bot.reply_to(message,f'Сейчас погода: {weather_temeratura.json()}')


# @bot.callback_query_handler(func=lambda call: True)
# def callback(call):
#     conn = sqlite3.connect('itproger.sql')
#     cur = conn.cursor()

#     cur.execute('SELECT * FROM users')
#     users = cur.fetchall()

#     info = ''
#     for el in users:
#         info += f'Имя: {el[1]}, пароль: {el[2]}\n'

#     cur.close()
#     conn.close()

#     bot.send_message(call.message.chat.id, info)
#     # bot.register_next_step_handler(message,on_click)
# def user_name(message):
#     global name
#     name = message.text.strip()
#     bot.send_message(message.chat.id,'Введите ваше пароль')
#     bot.register_next_step_handler(message,user_pass)
# def user_pass(message):
#     password = message.text.strip()

#     conn = sqlite3.connect('itproger.sql')
#     cur = conn.cursor()

#     cur.execute('INSERT INTO users (name, pass) VALUES ("%s","%s")'% (name,password))
#     conn.commit()
#     cur.close()
#     conn.close()
#     markup = types.InlineKeyboardMarkup()
#     markup.add(types.InlineKeyboardButton('Открыть базу данных',callback_data='open'))
#     bot.send_message(message.chat.id,'Пользватенль зарегистрировался!',reply_markup=markup)
# # def on_click(message):
# #     if message.text=='Перейти на сайт':
# #         bot.send_message(message.chat.id,'Успешно')

# @bot.message_handler(commands=['start'])
# def main(message):
#     bot.send_message(message.chat.id,f'Привет, {message.from_user.first_name}')

# @bot.message_handler(commands=['help'])
# def main(message):
#     markup=types.InlineKeyboardMarkup()
#     btn1=types.InlineKeyboardButton("Удалить текст", callback_data='delete')
#     btn2=types.InlineKeyboardButton("Изменить текст", callback_data='edit')
#     markup.add(types.InlineKeyboardButton("перейти на сайт", url='https://google.com'))
#     markup.add(btn1,btn2)

#     bot.send_message(message.chat.id,'Help information',reply_markup=markup)

# @bot.message_handler(commands=['site'])
# def site(message):
#     webbrowser.open("https://itproger.com")

# @bot.message_handler()
# def info(message):
#     if message.text.lower()=='привет':
#         bot.send_message(message.chat.id,f'Привет, {message.from_user.first_name}')

# @bot.callback_query_handler(func=lambda callback:True)
# def callback_message(callback):
#     if callback.data=='delete':
#         bot.delete_message(callback.message.chat.id,callback.message.message_id-1)
#     elif callback.data=='edit':
#         bot.edit_message_text('Edit text',callback.message.chat.id,callback.message.message_id)

# bot.polling(none_stop=True)