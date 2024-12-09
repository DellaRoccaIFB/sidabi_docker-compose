<template>
  <main class="login-screen">
    <div class="updrs-dashboard">
      <h2 class="updrs-title">UPDRS Dashboard</h2>
      
      <p>
        Dashboard web para visualização de dados relacionados com a doença de
        Parkinson.
      </p>
    </div>
    <div class="background-login">
      <h2>Login</h2>
      <form action="">
        <div class="input-login">
          <input
            class="user-input"
            type="text"
            name="usuário"
            id="usuario"
            placeholder="Admin"
          />
        </div>
        <div class="input-login">
          <input
            class="password-input"
            type="password"
            name="senha"
            id="senha"
            placeholder="Senha"
          />
        </div>
        <div class="information">
          <span>Esta plataforma utiliza as credenciais do SIDABI</span>
        </div>
        <div class="login-butom">
          <input type="submit" value="Entrar" />
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      msg: "Olá Mundo!",
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap");

* {
  margin: 0;
  border: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Lato", sans-serif;
}

body {
  background: linear-gradient(180deg, #3175d3 0%, #5590e0 100%);
}

main.login-screen {
  display: flex;
  background: linear-gradient(180deg, #3175d3 0%, #5590e0 100%);
  background-repeat: no-repeat;
  min-height: 100vh;
  min-width: 100vh;
  flex-direction: row;
  align-items: center;
  position: relative;
}

.updrs-dashboard {
  display: flex;
  justify-content: center;
  padding: 5%;
  flex-direction: column;
  flex-basis: 50%;
}

h2.updrs-title {
  color: white;
  font-size: 40px;
  margin-bottom: 10px;
}

p {
  color: white;
  font-size: 16px;
}

/*Login*/

.background-login {
  display: flex;
  background-color: white;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex-basis: 50%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-input {
  background-color: #e8e8e8;
  padding: 16px;
  height: 40px;
  width: 370px;
  margin: 8px;
  border-radius: 50px;
}

.password-input {
  background-color: #e8e8e8;
  padding: 16px;
  height: 40px;
  width: 370px;
  margin: 8px;
  border-radius: 50px;
}

span {
  size: 12px;
}
</style>
