import numpy
from tensorflow.keras import optimizers
from tensorflow.keras import layers
from tensorflow.keras import Sequential
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau

def build_model(conv_size, conv_depth):
    model = Sequential([layers.Input(shape=(14, 8, 8))])
    for _ in range(conv_depth):
        model.add(layers.Conv2D(filters=conv_size, kernel_size=3, padding='same', activation='relu'))
    model.add(layers.Flatten())
    model.add(layers.Dense(64, 'relu'))
    model.add(layers.Dense(1, 'sigmoid'))

    return model

def get_dataset():
    container = numpy.load('chess_solver/dataset.npz')
    x, y = container['x_train'], container['y_train']
    # normalize evaluation values to be between 0 and 1
    y = numpy.asarray(y / abs(y).max() / 2 + 0.5, dtype=numpy.float32)

    return x, y

model = build_model(32, 4)
x_train, y_train = get_dataset()
model.compile(optimizer=optimizers.Adam(5e-4), loss='mean_squared_error', metrics = ['accuracy'])
model.summary()
model.fit(x_train, y_train,
    batch_size=2048,
    epochs=1000,
    verbose=1,
    validation_split=0.1,
    callbacks=[
        ReduceLROnPlateau(monitor='loss', patiece=10),
        EarlyStopping(monitor='loss', patience=15, restore_best_weights=True)
    ]
)

model.save('model.h5')
print('done')
